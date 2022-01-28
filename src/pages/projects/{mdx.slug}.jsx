import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden"
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Layout from "../../components/LayoutComponent";

const useStyles = makeStyles((theme) => ({
    section: {
        height: "80vh"
    },
    hero_img: {
        height: "80vh",
        width: "100%",
        objectFit: "cover",
        position: "absolute",
        zIndex: 1,
    },
    hero_overlay: {
        background: "rgba(0, 0, 0, 0.6)",
        height: "80vh",
        width: "100%",
        position: "absolute",
        zIndex: 2,
    },
    hero_heading: {
        height: "70vh",
        zIndex: 100,
        position: "relative",
        justifyContent: "center",
    },
    hero_footer: {
        height: "10vh",
        zIndex: 100,
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center"
    },
}));

const TagList = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5)
}));

const FeaturedProject = ({ data }) => {
    const styles = useStyles();

    return (
        <Layout>
            <Paper className={styles.section}>
                <GatsbyImage
                    className={styles.hero_img}
                    image={getImage(data.mdx.frontmatter.image01)}
                    alt={data.mdx.frontmatter.image01_alt}
                    backgroundColor="lightgray"
                />
            <div className={styles.hero_overlay}></div>
                <Container maxWidth="xl" >
                    <Grid container className={styles.hero_heading} align="center" >
                        <Grid item mt={6}>
                            <Typography component="h1" variant="h2">
                                <strong> {data.mdx.frontmatter.title} </strong>
                            </Typography>
                            <Typography component="h2" variant="h5" color="secondary">
                                {data.mdx.frontmatter.short_description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Hidden smDown>
                        <Grid container className={styles.hero_footer} align="center" justifyContent="space-between" spacing={1}>
                            <Grid item xs={3}>
                                <Typography variant="button" color="secondary"> type </Typography>
                                <Typography variant="h6">{data.mdx.frontmatter.type}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="button" color="secondary"> framework </Typography>
                                <Typography variant="h6">{data.mdx.frontmatter.stack}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="button" color="secondary"> role </Typography>
                                <Typography variant="h6">{data.mdx.frontmatter.role}</Typography>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Container>
            </Paper>
            <Box px={{ xs: 3, sm: 5 }} py={{ xs: 10, sm: 10 }} >
                <Container maxWidth="md">
                    <Typography variant="h4" mb={2}> Project Overview </Typography>
                    <Typography variant="p">{data.mdx.frontmatter.full_description}</Typography>
                    <MDXRenderer>
                        {data.mdx.body}
                    </MDXRenderer>
                    <Typography component={"h3"} variant="p" mt={25}>
                        tags 🏷️
                    </Typography>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                    }}>
                        {data.mdx.frontmatter.tags.map((tag, i) => [
                            <TagList key={i}>
                                <Chip label={tag} color="secondary" clickable>
                                    {tag}
                                    {i < data.mdx.frontmatter.tags.length - 1 ? ' ' : ''}
                                </Chip>
                            </TagList>
                        ])}
                    </Box>
                </Container>
            </Box>
        </Layout>
    );
}

export const FeaturedQuery = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            frontmatter {
            title
            website
            github
            dockerHub
            role
            context
            type
            year
            stack
            short_description
            full_description
            lessons_learned
            tags
            thumbnail01 {
                childImageSharp {
                    gatsbyImageData(
                    width: 25
                    formats: [AUTO, WEBP, AVIF]
                    )
                }
            }
            thumbnail01_alt
            image01_alt
            image01 {
                childImageSharp {
                    gatsbyImageData(
                    width: 800
                    blurredOptions: {width: 100}
                    transformOptions: {cropFocus: CENTER}
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    )
                }
            }
            }
            body
        }
    }
`

export default FeaturedProject;