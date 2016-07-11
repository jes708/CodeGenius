'use strict';

import {lightGreenA400, grey800} from 'material-ui/styles/colors';

const commentStyles = {
  CommentToolbar: {
    alignItems: "center"
  },
  badge: {
    exists: {
      color: lightGreenA400
    },
    notExists: {
      color: grey800
    },
    style: {
      top: '13px',
      right: '11px',
      width: '17px',
      height: '17px'
    },
    iconStyle: {
      top: '10px',
      right: '10px',
      width: '16px',
      height: '16px'
    }
  },
  CommentsList: {
    refresh: {
      display: 'inline-block',
      position: 'relative',
    }
  }
}


export default commentStyles;
