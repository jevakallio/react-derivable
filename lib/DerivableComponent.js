import React from 'react';
import {struct, unpack} from 'derivable';

export default function DerivableComponent(schema, renderer) {
  const propTypes = {};
  const defaults = {};

  Object.keys(schema).forEach(key => {
    let def = schema[key];
    if (typeof def === 'function') {
      def = def(null);
    }
    propTypes[key] = def.type;
    if (def.value !== null && typeof def.value !== 'undefined') {
      defaults[key] = def.value;
    }
  });

  const bound = struct(defaults);

  const DerivableComponent = React.createClass({
    propTypes,
    render() {
      return renderer(this.props);
    }
  });

  return (props) => <DerivableComponent {...bound.get()} {...props} />;
}

// Helper for creating property schema
//  e.g. Prop(string.isRequired)(defaultValue)
DerivableComponent.Prop = (type) => {
  return value => ({value, type});
}
