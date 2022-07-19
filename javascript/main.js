// 1ère façon de faire de l'asynchorne
var url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes';
// var url = 'https://opendata.paris.fr/api/datasets/1.0/search/?q=';
var req = new Request(url);


const getRecords = async () => {
    try {
        const response = await fetch(req);
        const data = await response.json();
        return data.records;

    } catch (error) {
        console.error('Problème de requête asynchrone : ' + error);
    }
}

displayRecords = async () => {
    let html = '';
    const records = await getRecords();
    // console.clear();
    console.log("bip");
    // console.log(records);
    // console.log(records[0].fields.name);
    // console.log(records[0].fields.ebike);

    records.map(record => {
        let htmlSegment = `
            <div class="record text-dark">
                <div class="station">
                    <p class="m-2">${record.fields.name}</p>
                </div>
                <div class="total-bikes m-2">
                    <p class="text-center">${record.fields.numbikesavailable}</p>
                </div>
                <div class="classic-bikes">
                    <p class="text-center m-2">${record.fields.mechanical}</p>
                </div>
                <div class="e-bikes">
                    <p class="text-center m-2">${record.fields.ebike}</p>
                </div>
            </div>
        `;
        html += htmlSegment;
    });

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = html;
};

displayRecords();
setInterval(displayRecords, 1000*60);

