'use strict';
// Minimal JSON Schema validator (the subset portfolio.schema.json uses) so the builder has zero dependencies.
// Supports: type, required, properties, additionalProperties:false, items, enum, const, minLength/maxLength,
// minItems/maxItems, pattern, local $ref. `format` is deliberately ignored except a basic email check.

function validate(data, schema) {
  const errors = [];
  const root = schema;

  const resolve = (s) => {
    if (s && s.$ref) {
      const path = s.$ref.replace(/^#\//, '').split('/');
      return path.reduce((o, k) => o[k], root);
    }
    return s;
  };

  const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : Number.isInteger(v) ? 'integer' : typeof v);

  function walk(value, s, path) {
    s = resolve(s);
    const t = typeOf(value);
    if (s.type) {
      const ok = s.type === t || (s.type === 'number' && t === 'integer');
      if (!ok) return errors.push(`${path || '(root)'}: expected ${s.type}, got ${t}`);
    }
    if (s.const !== undefined && value !== s.const) errors.push(`${path}: must be ${JSON.stringify(s.const)}`);
    if (s.enum && !s.enum.includes(value)) errors.push(`${path}: must be one of ${s.enum.join(', ')}`);

    if (t === 'string') {
      if (s.minLength != null && value.length < s.minLength) errors.push(`${path}: too short`);
      if (s.maxLength != null && value.length > s.maxLength) errors.push(`${path}: too long (max ${s.maxLength})`);
      if (s.pattern && !new RegExp(s.pattern).test(value)) errors.push(`${path}: does not match ${s.pattern}`);
      if (s.format === 'email' && !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value)) errors.push(`${path}: not a valid email`);
    }
    if (t === 'array') {
      if (s.minItems != null && value.length < s.minItems) errors.push(`${path}: needs at least ${s.minItems} items`);
      if (s.maxItems != null && value.length > s.maxItems) errors.push(`${path}: too many items (max ${s.maxItems})`);
      if (s.items) value.forEach((v, i) => walk(v, s.items, `${path}[${i}]`));
    }
    if (t === 'object') {
      for (const k of s.required || []) if (value[k] === undefined) errors.push(`${path ? path + '.' : ''}${k}: required`);
      const props = s.properties || {};
      for (const [k, v] of Object.entries(value)) {
        if (props[k]) walk(v, props[k], path ? `${path}.${k}` : k);
        else if (s.additionalProperties === false) errors.push(`${path ? path + '.' : ''}${k}: unknown field`);
      }
    }
  }

  walk(data, schema, '');
  return errors;
}

module.exports = { validate };
