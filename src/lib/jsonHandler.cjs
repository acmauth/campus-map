const jsonUrl = 'https://class.auth.gr/calendar/getRooms';

const fs = require('fs').promises;

const extractedData = [];
const correspondingIds = { deptId: {}, buildingId: {} };

function extractAndWriteToJson() {


    return fetch(jsonUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((jsonData) => {

            for (let i = 0; i < jsonData.length; i++) {
                extractedData.push(
                    {
                        id: jsonData[i].id,
                        name: jsonData[i].name,
                        deptId: jsonData[i].unitId,
                        buildingId: jsonData[i].name,
                        type: jsonData[i].type,
                        floor: jsonData[i].floor,

                    }
                )
                correspondingIds['deptId'][jsonData[i]['unitId']] = jsonData[i]['unitName']
                correspondingIds['buildingId'][jsonData[i]['buildingId']] = jsonData[i]['buildingData']['name']

            }

            const extractedJsonContent = JSON.stringify(extractedData, null, 2);
            const correspondingIdsJson = JSON.stringify(correspondingIds, null, 2);

            fs.writeFile('corresponding.json', correspondingIdsJson, 'utf8');
            fs.writeFile('classes.json', extractedJsonContent, 'utf8');

            return
        })
        .then(() => {
            console.log('Extracted data has been successfully written to the new JSON file.');
        })
        .catch((error) => {
            console.error('Error extracting and writing data:', error);
        });
}

extractAndWriteToJson()