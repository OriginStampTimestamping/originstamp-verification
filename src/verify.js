var convert = require('xml-js');
var crypto = require('crypto');

const verify =  {
  SHA256: function(input) {
    return crypto.createHash('sha256')
      .update(input)
      .digest('hex');
  },
/* Transform the parsed XML tree to a JS-structure and builds a index for all nodes (hash as key). */
transformTree: function(index, node, tagName, parentHash) {
  let res;
  if (!node.left && !node.right) {
    // Reached lowest node/leaf.
    res = {
      parent: parentHash,
      tag: tagName,
      attributes: node._attributes,
      left: null,
      right: null,
      hash: node._attributes['value']
    };
  } else {
    res = {
      parent: parentHash || null,
      tag: tagName,
      attributes: node._attributes,
      left: node.left ? this.transformTree(index, node.left, 'left', node._attributes['value']) : null,
      right: node.right ? this.transformTree(index, node.right, 'right', node._attributes['value']) : null,
      hash: node._attributes['value']
    };
  }
  res.isRootNode = !parentHash;
  res.isHashNode = node._attributes['type'] === 'hash';
  res.isMeshNode = node._attributes['type'] === 'mesh';
  console.error(res);
  index[res.hash] = res;
  return res;
},

/* Validates XML Merkle Tree proof by calculating all leaf relationships. */
validateMerkleTree: function (xml) {
  try {
    var compact = convert.xml2js(xml, {compact: true, spaces: 2});
    const index = {};
    const tree = this.transformTree(index, compact.node, 'node', null);
    const hashNode = Object.keys(index)
      .filter((hash) => index[hash].isHashNode)
  .map ((hash) => index[hash]);
    if (hashNode.length !== 1) {
      throw new Error ('Too many hash nodes.');
    }
    let curNode = hashNode.pop();
    const calculationSteps = [];
    while (!curNode.isRootNode) {
      const isLeft = curNode.tag === 'left';
      const isRight = curNode.tag === 'right';
      if (isLeft && isRight) {
        throw new Error ('Invalid zwitter node.');
      } else if (!isLeft && !isRight) {
        throw new Error ('Invalid negative zwitter node.');
      }
      const parentNode = index[curNode.parent];
      const sibling = isLeft
        ? parentNode.right
        : parentNode.left;
      // Calculate
      const left = isLeft ? curNode : sibling;
      const right = isRight ? curNode : sibling;
      console.error ('Calculating hashes...');
      console.error (`Left: ${left.hash}`);
      console.error (`Right: ${right.hash}`);
      const aggHash = this.SHA256(left.hash + right.hash);
      console.error (`Aggregated (parent): ${aggHash}`);
      if (aggHash !== curNode.parent) {
        throw new Error (`Invalid aggregated hash at node ${curNode.parent}. Expected: ${curNode.parent}. Actual: ${aggHash}`)
      }
      calculationSteps.push({
        node: curNode.hash,
        position: isLeft ? 'left' : 'right',
        sibling: sibling.hash,
        aggregatedHash: aggHash,
        isRootNode: curNode.isRootNode,
        isHashNode: curNode.isHashNode
      });

      curNode = index[curNode.parent];
    }
    console.info ('Valid tree.');
    console.info (calculationSteps);
    return {
      xml: xml,
      index: index,
      tree: tree,
      calculationSteps: calculationSteps
    }
  } catch (e) {
    console.error (e);
  }
}
};

module.exports = verify;
