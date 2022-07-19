// l'utl pour fetch a été trouvée au bas de la page de l'API : https://opendata.paris.fr/explore/dataset/velib-disponibilite-en-temps-reel/api/?rows=100&disjunctive.name&disjunctive.is_installed&disjunctive.is_renting&disjunctive.is_returning&disjunctive.nom_arrondissement_communes
var url = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes';

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
    // A la ligne du dessus, on note une différence avec l'exercice d'avant qui envoyait les datas en paramètres de la présente fonction.
    // Ici on ré-utilise le principe d'enchaînements des tâches asynchrones. 
 

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

