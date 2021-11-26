const getGoods = ()=>{
    const links = document.querySelectorAll('.navigation-link');

    const getData = ()=>{
        fetch('/db/db.json')
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem('goods',JSON.stringify(data));
            console.log((JSON.parse(localStorage.getItem('goods'))));
        })            
    }

    links.forEach(link=>{
        link.addEventListener('click', (event)=>{
            getData();
        });
    });    
};

getGoods();