const path = require('path')
const createPath = require('gatsby-plugin-page-creator/create-path')

exports.createPages = ({boundActionCreators: {createPage, createRedirect}, graphql}) => {
  createRedirect({
    fromPath: `/admin`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/admin/`
  })

  const Template = path.resolve(`src/templates/MarkdownPage.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: Template,
        context: {}
      })
    })
  })
}

exports.onCreateNode = ({node, getNode}) => {
  if (node.internal.type !== 'MarkdownRemark') {
    return
  }

  const parentNode = getNode(node.parent)

  if (parentNode.sourceInstanceName !== 'pages') {
    return
  }

  node.frontmatter.date = new Date(parentNode.modifiedTime)

  const pagesDir = path.resolve(__dirname, 'src/pages')

  node.frontmatter.path = createPath(pagesDir, parentNode.absolutePath)
}
