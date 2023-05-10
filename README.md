INF653 Back End Web Development - Final Project Requirements
1) PROJECT: You will build a Node.js REST API for US States data using both Express and MongoDB.

Your REST API will provide responses to the following GET requests:
Request: Response:
/states/ All state data returned
/states/?contig=true All state data for contiguous states (Not AK or HI)
/states/?contig=false All state data for non-contiguous states (AK, HI)
/states/:state All data for the state URL parameter
/states/:state/funfact A random fun fact for the state URL parameter
/states/:state/capital { ‘state’: stateName, ‘capital’: capitalName }
/states/:state/nickname { ‘state’: stateName, ‘nickname’: nickname }
/states/:state/population { ‘state’: stateName, ‘population’: population }
/states/:state/admission { ‘state’: stateName, ‘admitted’: admissionDate }

Your REST API will provide responses to the following POST request:
Request: Response:
/states/:state/funfact The result received from MongoDB

Your REST API will provide responses to the following PATCH request:
Request: Response (fields):
/states/:state/funfact The result received from MongoDB

Your REST API will provide responses to the following DELETE request:
Request: Response (fields):
/states/:state/funfact The result received from MongoDB
