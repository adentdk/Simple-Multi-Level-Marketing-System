exports.generateNestedInclude = (model, alias, level, last = null) => {
  if (level === 1) {
    return last || { model, as: alias, };
  } else {
    return {
      model,
      as: alias,
      include: [this.generateNestedInclude(model, 'children', level - 1)],
    };
  }
};

exports.generateGroupBy = (level) => {
  let groups = [];
  for (let j = 0; j < level; j++) {
    groups.push(`children${'->children'.repeat(j)}.id`);
  }
  return groups;
};

