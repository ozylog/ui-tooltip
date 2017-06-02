# @ozylog/ui-tooltip
React UI Tooltip

[![Travis](https://img.shields.io/travis/ozylog/ui-tooltip.svg)](https://travis-ci.org/ozylog/ui-tooltip) [![npm](https://img.shields.io/npm/dt/@ozylog/ui-tooltip.svg)](https://www.npmjs.com/package/@ozylog/ui-tooltip)

## Installation
```
npm install @ozylog/ui-tooltip --save
```

## Usage
```
<Tooltip />
```

```
<Box trigger=['click'(default) || 'hover'] align=['left'(default) || 'center' || 'right'] />
```

## Usage Example
```javascript
'use strict';

import React, {Component} from 'react';
import {Tooltip, Box} from '@ozylog/ui-tooltip';

export default class TestContainer extends Component {
  render() {
    return (
      <div className='Test'>
        <Tooltip>
          Hello
          <Box>World</Box>
        </Tooltip>
      </div>
    );
  }
}
```

## License
MIT
