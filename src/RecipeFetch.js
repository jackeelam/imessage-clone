import db from './firebase';

const RecipeFetch = (q) => {
    let u1 = '';
    let u2 = '';
    let u3 = '';
    let i1 = '';
    let i2 = '';
    let i3 = '';
    let s1 = '';
    let s2 = '';
    let s3 = '';
    let l1 = '';
    let l2 = '';
    let l3 = '';

    function formatParams( params ){
        return "?" + Object
            .keys(params)
            .map(function(key){
            return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }

    const endpoint = 'https://api.edamam.com/api/recipes/v2';
    let parameters = {
        "type": 'public',
        "q": q,
        "app_id": 'b6ea811a',
        "app_key": 'fcf1fb0a1cf2574eaeb07b483a2561ad',
        "field": 'url'
    }
    let url = endpoint + formatParams(parameters)
    let xtra_param = '&field=label&field=source&field=image'
    return fetch(url+xtra_param).then( res => res.json()).then(response => {
        let recipe = (response);
        u1 = JSON.stringify(recipe.hits[0].recipe.url);
        u2 = JSON.stringify(recipe.hits[1].recipe.url);
        u3 = JSON.stringify(recipe.hits[2].recipe.url);

        i1 = JSON.stringify(recipe.hits[0].recipe.image);
        i2 = JSON.stringify(recipe.hits[1].recipe.image);
        i3 = JSON.stringify(recipe.hits[2].recipe.image);

        l1 = JSON.stringify(recipe.hits[0].recipe.label);
        l2 = JSON.stringify(recipe.hits[1].recipe.label);
        l3 = JSON.stringify(recipe.hits[2].recipe.label);
       
        s1 = JSON.stringify(recipe.hits[0].recipe.source);
        s2 = JSON.stringify(recipe.hits[1].recipe.source);
        s3 = JSON.stringify(recipe.hits[2].recipe.source);
       
       
        db.collection("recipes").doc(q).set({
            ingredients: q,

            label1: l1.replaceAll('"',''),
            source1: s1.replaceAll('"',''),
            url1: u1.replaceAll('"',''),
            img1: i1.replaceAll('"',''),
            

            label2: l2.replaceAll('"',''),
            source2: s2.replaceAll('"',''),
            url2: u2.replaceAll('"',''),
            img2: i2.replaceAll('"',''),
            

            label3: l3.replaceAll('"',''),
            source3: s3.replaceAll('"',''),
            url3: u3.replaceAll('"',''),
            img3: i3.replaceAll('"','')
            
        })
    })
}

export default RecipeFetch;