require(`dotenv`).config()
const { toSlug } = require("@reflexjs/gatsby-helpers") 

module.exports = {
  siteMetadata: {
    title: "Arsene Kuo",
    description: "Arsene's Personal Website.",
    siteUrl: process.env.SITE_URL || "http://localhost:8000",
  },
  plugins: [
    "@reflexjs/gatsby-theme-base",
    {
      resolve: `@reflexjs/gatsby-theme-post`,
      options: {
        contentPath: "content/posts",
        basePath: "/blog",
        postsPerPage: 4,
        pageQuery: `
          query {
            allPost(sort: {fields: date, order: DESC}, filter: {tags: {elemMatch: {name: {nin: "example"}}}}) {
              nodes {
                id
                slug
              }
            }
            allPostTag(sort: {fields: name, order: ASC}) {
              nodes {
                id
                name
                slug
              }
            }
          }
        `,
        slugResolver: null,
      }
    },
    "@reflexjs/gatsby-theme-post",
    {
      resolve: "@reflexjs/gatsby-plugin-metatags",
      options: {
        types: [`Page`, `Post`],
      },
    },
  ],
}
