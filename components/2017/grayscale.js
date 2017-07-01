import { css } from 'styled-components'

export default css`
  filter: url("data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\'&gt;&lt;filter id=\'grayscale\'&gt;&lt;feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/&gt;&lt;/filter&gt;&lt;/svg&gt;#grayscale");
  filter: gray;
  -webkit-filter: grayscale(100%);
  transition: filter 0.2s, -webkit-filter 0.2s;
  will-change: filter, -webkit-filter;
  
  &:hover {
    filter: url("data:image/svg+xml;utf8,&lt;svg xmlns=\'http://www.w3.org/2000/svg\'&gt;&lt;filter id=\'grayscale\'&gt;&lt;feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/&gt;&lt;/filter&gt;&lt;/svg&gt;#grayscale");
    -webkit-filter: grayscale(0%);
  }
`
