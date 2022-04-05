import React from "react";
import Cards from "../core/Cards";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Cali = ({ handleSkillUnlock, skills }) => {
  return (
    <section>
        <Container spacing={2} sx={{ display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 5, marginBottom: 12}}>
          <Typography variant="h3" gutterBottom>
          CALISTHENICS
          </Typography>
          <Typography variant="h4" gutterBottom>
            "I'm the guy doing calisthenics. I'm doing jumping jacks and deep knee
            bends. I work out like a British person." - Ryan Reynolds
          </Typography>
        </Container>
      <Grid container spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        {skills ? (
          skills.map((skill, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Cards
                  skill={skill}
                  handleSkillUnlock={handleSkillUnlock}
                />
              </Grid>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </Grid>
    </section>
  );
};

export default Cali;
