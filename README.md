#States API

MVC style Node.js REST API using Express, Mongoose, and MongoDB

Data also provided by JSON file

ROUTE	GET

/states/	All state data returned

/states/?contig=true	All state data for contiguous states (Not AK or HI)

/states/?contig=false	All state data for non-contiguous states (AK, HI)

/states/:state	All data for the state URL parameter

/states/:state/funfact	A random fun fact for the state URL parameter

/states/:state/capital	{ 'state': stateName, 'capital': capitalName }

/states/:state/nickname	{ 'state': stateName, 'nickname': nickname }

/states/:state/population	{ 'state': stateName, 'population': population }

/states/:state/admission	{ 'state': stateName, 'admitted': admissionDate }

ROUTE	POST/PATCH/DELETE

/states/:state/funfact	The result received from MongoDB

API: https://conscious-platinum-napkin.glitch.me
