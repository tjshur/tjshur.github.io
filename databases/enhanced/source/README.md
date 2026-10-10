# Grazioso Salvare Dashboard

## Project Overview

This project was originally created in CS 340: Client/Server Development. It uses Python, Dash, MongoDB, and PyMongo to provide an interactive dashboard for viewing Austin Animal Center shelter data and identifying dogs that may be appropriate for different types of search-and-rescue training.

The original application allowed the user to select one of three rescue categories:

- Water Rescue
- Mountain or Wilderness Rescue
- Disaster or Individual Tracking

Each selection used a MongoDB query based on Grazioso Salvare's preferred breed, sex, and training-age requirements. Matching animals were displayed in a data table, breed-distribution chart, and geolocation map.

## CS 499 Database Enhancement

For the CS 499 Computer Science Capstone, the database functionality was enhanced from basic filtering into a rescue-candidate scoring and decision-support system.

The original dashboard treated every animal that met all of the required filter conditions as an equal match. The enhanced version uses MongoDB aggregation pipelines to create a larger candidate pool, evaluate each candidate against the original rescue criteria, calculate a candidate score, rank the results, and generate summary information.

The enhancement keeps the original Grazioso Salvare rescue requirements as the basis for the evaluation.

### Rescue Candidate Scoring

Candidates must first belong to one of the preferred breed groups for the selected rescue type.

Each candidate can then receive up to three points:

- 1 point for belonging to a preferred breed group
- 1 point for matching the preferred sex
- 1 point for being within the preferred training-age range

The resulting scores are classified as:

- **3 - Strong Match:** Meets the preferred breed, sex, and age criteria
- **2 - Moderate Match:** Meets the preferred breed requirement and one additional criterion
- **1 - Basic Match:** Meets the preferred breed requirement only

Candidates are ranked from strongest to weakest match.

This approach preserves the original fully qualified candidates at the top of the results while also showing near-matches that the original filter-only approach excluded.

## MongoDB Aggregation

The enhanced dashboard adds an `aggregate()` method to the `AnimalShelter` database class.

MongoDB aggregation is used to:

1. Filter animals into the appropriate rescue candidate pool.
2. Evaluate the preferred sex and training-age requirements.
3. Calculate a candidate score.
4. Assign a match-strength label.
5. Rank candidates from strongest to weakest.
6. Generate summary statistics from the same candidate pool.

A MongoDB `$facet` stage is used so the database can return both the ranked candidate records and summary information from the same aggregation operation.

## Dashboard Enhancements

When a rescue category is selected, the enhanced dashboard now displays:

- Candidate Score
- Match Strength
- Total number of candidates
- Number of Strong Matches
- Number of Moderate Matches
- Number of Basic Matches
- Average candidate score

The original data table, breed-distribution chart, rescue filters, and geolocation map remain available.

The map logic was also updated to reference fields by name rather than relying on fixed column positions. This allows the additional scoring fields to be added without breaking the geolocation functionality.

## Enhancement Test Results

The enhanced aggregation pipelines were tested against 10,000 animal shelter records.

### Water Rescue

- Total Candidates: 608
- Strong Matches: 17
- Moderate Matches: 264
- Basic Matches: 327
- Average Score: 1.49 / 3

### Mountain or Wilderness Rescue

- Total Candidates: 47
- Strong Matches: 5
- Moderate Matches: 23
- Basic Matches: 19

### Disaster or Individual Tracking

- Total Candidates: 36
- Strong Matches: 4
- Moderate Matches: 26
- Basic Matches: 6

All three rescue categories were tested successfully. The ranked candidate table, summary information, breed-distribution chart, and geolocation map updated correctly for each category. The Reset option also returned the dashboard to the complete 10,000-record dataset.

## Main Technologies

- Python
- MongoDB
- PyMongo
- Pandas
- Dash
- Plotly
- Dash Leaflet
- Jupyter Notebook

## Project Files

- `ProjectTwoDashboard.ipynb` - Interactive Grazioso Salvare dashboard and enhanced rescue-candidate decision-support logic
- `CRUD_Python_Module.py` - MongoDB CRUD and aggregation database-access layer
- `aac_shelter_outcomes.csv` - Animal shelter dataset
- `Grazioso Salvare Logo.png` - Dashboard branding image
- `7-2 Project Two README.docx` - Original CS 340 project documentation
- `README.md` - Project and CS 499 enhancement documentation

## Original CS 340 Reflection

Writing programs that are maintainable, readable, and adaptable comes down to keeping things organized and not trying to do everything in one place. The biggest example of that in this course was the CRUD Python module. Instead of putting database logic directly into the dashboard, separating it into its own module made the overall project easier to understand and easier to update later. If something needed to change with how the database was accessed, it could be handled in one place without touching the rest of the dashboard code. That structure also makes the code more reusable. The same CRUD module could be used in a different application, whether that is another dashboard or a completely different system that needs to interact with the same database.

When approaching a problem as a computer scientist, I focus on breaking the requirements into smaller pieces and solving them one at a time. For this project, that meant first making sure the database was working, then making sure queries returned the correct data, and only after that building the dashboard on top of it. This was different from some earlier courses where everything was more isolated. Here, everything had to connect and work together, which made the process more realistic. In the future, I would follow the same approach by starting with the data and making sure it is structured correctly before building anything on top of it.

Computer scientists build systems that allow organizations to use their data effectively, and that has a direct impact on how well those organizations operate. In this project, the dashboard makes it easier for a company like Grazioso Salvare to identify animals that meet specific criteria without manually searching through large amounts of data. Instead of guessing or sorting through records one by one, they can filter results instantly and make decisions based on accurate information. That kind of tool improves efficiency and helps ensure better outcomes, which is why this type of work matters.