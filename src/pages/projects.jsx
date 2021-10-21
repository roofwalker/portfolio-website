import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link, graphql } from "gatsby";

import { Box, Card, CardActions, CardActionArea, CardContent, Container, Grid, IconButton, makeStyles, Typography, CardMedia } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDocker} from "@fortawesome/free-brands-svg-icons/faDocker"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/LayoutComponent";
import Seo from "../components/SeoComponent";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
        color: '#d50000'
    },
  },
  card: {
    overflow: "hidden",
  },
  pageLink: {
    marginRight: "auto"
  }
}))

const ProjectsPage = ({ data }) => {

  const styles = useStyles();

  return (
    <Layout>
      <Seo title="projects" />
      <Box px={{ xs: 3, sm: 5 }} py={{ xs: 15, sm: 15 }} >
        <Container maxWidth="lg">
          <Link
            to="/"
            variant="button"
            className={styles.link}
          >
            Home
          </Link>
          <Typography variant="h4" style={{marginTop: 10}}>Projects Directory</Typography>
          <br />
          <hr />

          <Grid container spacing={2} style={{marginTop: 40}}>
            {
              data.allMdx.nodes.map((node) => (
                <Grid item xs={12} sm={6} md={4} key={node.id}>
                  <Card className={styles.card}>



                    <CardActionArea>

                    <CardMedia component="div" >
                      <GatsbyImage
                        id="image"
                        objectFit="cover"
                        image={getImage(node.frontmatter.image01)}
                        alt={node.frontmatter.image01_alt}
                      />
                    </CardMedia>
                      <CardContent>


                        <Typography variant="h5">
                          {node.frontmatter.title}
                        </Typography>
                        <Typography variant="body" color="secondary">
                          {node.frontmatter.short_description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                      <Box style={{marginRight:"auto"}}>
                        <Link href={node.frontmatter.github}>
                          <IconButton>
                            <FontAwesomeIcon icon={faGithub} size="sm" />
                          </IconButton>
                        </Link>
                        <Link href={node.frontmatter.dockerHub}>
                          <IconButton>
                            <FontAwesomeIcon icon={faDocker} size="sm" />
                          </IconButton>
                        </Link>
                      </Box>
                      <Box >
                        <Link to={`/projects/{node.slug}`}>
                          <IconButton style={{justifySelf:"end"}} >
                            <FontAwesomeIcon icon={faExpand} size="sm" />
                          </IconButton>
                        </Link>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export const ProjectQuery = graphql`
  query {
  allMdx {
    nodes {
      frontmatter {
        title
        website
        github
        dockerHub
        role
        context
        year
        stack
        short_description
        full_description
        lessons_learned
        image01_alt
        image01 {
              childImageSharp {
                  gatsbyImageData(
                    width: 400
                    height: 250
                    blurredOptions: {width: 100}
                    transformOptions: {cropFocus: CENTER}
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
              }
          }
      }
      id
      slug
    }
  }
}
`

export default ProjectsPage;