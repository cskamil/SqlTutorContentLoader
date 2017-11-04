# SqlTutorContentLoader
Redirects to SQL-TUTOR contents by providing appropriate parameters.  

This project is a NodeJS project. It generates the SQL-TUTOR content URL and makes the client to be redirected to that content automatically.  

To host SQL-TUTOR content in MasteryGrids, we required to have a single URL which can be added as an activity. However, SQL-TUTOR requires prior step(session creation) to serve contents.  
In order to make SQL-TUTOR content loadable from MG without changing the MG, SqlTutorContentLoader is implemented.

SqlTutorContentLoader performs following actions to generate SQL-TUTOR content URL:  
1-Listens any SQL-TUTOR content request at pawscomp2.sis.pitt.edu/sqltutor/content  
2-Calls SQL-TUTOR session (codeid and code) generation service => Check config.json for service URL and required parameters  
3-Parse session response which is XML format.  
4-Calculate the MD5 of the following string: userid+codeid+secretword => which is the hcode parameter of the SQL-TUTOR content.  
5-Add the parsed codeid as codeid parameter.  
6-Persist the generated MD5 and codeid: key=userid, value={codeid, hashCode}. Persisted data is stored under session_cache folder and when the server restarts, it is reloaded.
