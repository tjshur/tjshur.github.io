# Databases

## Grazioso Salvare Dashboard

The Grazioso Salvare Dashboard is a database-driven application I originally developed in CS 340: Client/Server Development. The project uses MongoDB and a Dash interface to work with animal shelter data and help identify dogs that may be good candidates for different types of rescue training.

### Original Artifact

The original artifact represents the dashboard before the CS 499 capstone enhancement. It allowed users to filter shelter records based on rescue criteria and display the matching animals in the dashboard.

[Download the Original Artifact](original/CS499_GraziosoSalvare_Original_Artifact.zip)

### Enhancement

For the Databases category of CS 499, I enhanced the project by turning the existing filtering process into a database-driven scoring and decision-support system.

The enhancement includes:

- MongoDB aggregation pipelines for rescue candidate evaluation
- Use of `$match`, `$addFields`, `$switch`, and `$facet`
- A three-level scoring system for Basic, Moderate, and Strong matches
- Ranking of qualifying rescue candidates instead of treating every match equally
- Summary information returned with the ranked results
- Testing across all three rescue categories
- Preservation of the original Strong Match candidates while adding additional levels of useful results

The scoring rules were kept directly tied to the existing rescue criteria rather than adding unsupported weights or assumptions. This allows the dashboard to provide more useful information while still keeping the results based on the original project requirements.

Testing confirmed that the aggregation process worked across all three rescue categories and preserved the animals that already met the strongest original criteria.

[Download the Enhanced Artifact](enhanced/CS499_GraziosoSalvare_Enhanced_Artifact.zip)

[View the Enhancement Narrative](CS499_GraziosoSalvare_Enhancement_Narrative.docx)

[View the Enhanced README](enhanced/source/README.md)

### Current Status

This artifact has been reviewed for inclusion in the final ePortfolio. Instructor feedback did not identify any technical issues requiring changes to the enhancement and specifically confirmed the MongoDB aggregation approach, scoring design, testing results, and technical reflection. The original artifact, enhanced artifact, source files, narrative, and supporting documentation are included here as the finalized Databases artifact.
