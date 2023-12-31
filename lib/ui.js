import { searchProducts, 
  allCatagories, 
  catagorySite, 
  productSearch, 
  alikeProducts, 
  allarVorur } from './api.js';
import { el } from './elements.js';


export async function renderFrontpage(
  parentElement,
  query = undefined,
  ) {
    const nyjar_vorur = el('h1', {class: 'nyjar_vorur'}, 'Nýjar vörur');
    const takki = el(
      'button', 
      {class: 'takki'}, 
      el('a', 
      {href: '?categories=categories'}, 
      'Skoða alla flokka'));
    const categ = el('h2', {class: 'voruflokkar'}, 'Skoðaðu vöruflokkana okkar');

    const header = el(
      'header',
      {class: 'header'},
      el('nav', { class: 'navi'}, 
        el('ul', {class: 'title'},
          el('li', {},
            el('a', { href: '/', class: 'heim_linkur'},
              el('strong', {class : 'title'}, 'Vefforritunarbúðin')))),
      el('div', {class: 'nav_haegri'},
        el('ul', {class: 'nav_uppi'},
            el('li', {}, el('a', {href: '/'}, 'Nýskrá')),
            el('li', {}, el('a', {href: '/'}, 'Innskrá')),
            el('li', {}, el('a', {href: '/'}, 'Karfa'))),
        el('ul', {class: 'nav_nidri'},
            el('li', {}, el('a', {href: '/'}, 'Nýjar vörur')),
            el('li', {}, el('a', {href: '?products=products'}, 'Vörulisti')),
            el('li', {}, el('a', {href: '?categories=categories'}, 'Flokkar')))
    )));

    const list = el('section', { class: 'listi'});
    const vorur = await searchProducts(query, 6);

    for(const vara of vorur){ 
      const cards = el( 
        'div', 
        { class: 'spil' }, 
        el('a', {href: `?id=${vara.id}`},
        el('img', {class: 'mynd', src: `${vara.image}`, alt: `${vara.title}`}),
        el('div', {class: 'texti'},
          el('div', {class: 'titll_cate'},
            el('p', {class: 'titill'}, `${vara.title}`),
            el('p', {class: 'category'}, `${vara.category_title}`)),
          el('div', {class: 'verdd'},   
            el('p', {class: 'verd'}, `${vara.price}`, ' kr.-'))))
      );

      list.appendChild(cards);
      parentElement.appendChild(list);
    }

    const listi = el('section', {class: 'listi2'});
    const boxes = await allCatagories(query);

    for(const box of boxes){
      const category = el(
        'div',
        { class: 'boxess'},
        el('p', {class : 'box'}, el('a',{href: `?category=${box.id}`}, `${box.title}`))        
      );
      listi.appendChild(category);
      parentElement.appendChild(listi);
    }

    const container = el('main', {}, header, nyjar_vorur, list, takki, categ, listi);
    parentElement.appendChild(container);
}


export async function renderCategory(parentElement, id){
  const header = el(
    'header',
    {class: 'header'},
    el('nav', { class: 'navi'}, 
      el('ul', {class: 'title'},
        el('li', {},
          el('a', { href: '/', class: 'heim_linkur'},
            el('strong', {class : 'title'}, 'Vefforritunarbúðin')))),
    el('div', {class: 'nav_haegri'},
      el('ul', {class: 'nav_uppi'},
          el('li', {}, el('a', {href: '/'}, 'Nýskrá')),
          el('li', {}, el('a', {href: '/'}, 'Innskrá')),
          el('li', {}, el('a', {href: '/'}, 'Karfa'))),
      el('ul', {class: 'nav_nidri'},
          el('li', {}, el('a', {href: '/'}, 'Nýjar vörur')),
          el('li', {}, el('a', {href: '?products=products'}, 'Vörulisti')),
          el('li', {}, el('a', {href: '?categories=categories'}, 'Flokkar')))
    )));
  
  const categ = await allCatagories(id);
  for(const box of categ){
    if(box.id === id){
      box;
    }
  }

  const eitt = await catagorySite(id);

  const nafnASerCategory = el('h2', { class: 'nafnAcategory' }, `${eitt[0].category_title}`);
  
  const listis = el('section', {class: 'listi'});

  for( const hlutur of eitt){
    const eihv = el(
      'div',
      { class: 'spil'},
      el('a', {href: `?id=${hlutur.id}`},
      el('img', {class: 'mynd', src: `${hlutur.image}`, alt: `${hlutur.title}`}),
      el('div', {class: 'texti'},
        el('div', {class: 'titll_cate'},
          el('p', {class: 'titill'}, `${hlutur.title}`), 
          el('p', {class: 'category'}, `${hlutur.category_title}`)),  
        el('div', {class: 'verdd'},
          el('p', {class: 'verd'}, `${hlutur.price}`, ' kr.-'))))
    );
    listis.appendChild(eihv);  
    
  }
  
  const container = el('main', {}, header, nafnASerCategory, listis);
  container.appendChild(listis);
  parentElement.appendChild(container);
}


export async function renderProducts(parentElement, id){
  const header = el(
    'header',
    {class: 'header'},
    el('nav', { class: 'navi'}, 
      el('ul', {class: 'title'},
        el('li', {},
          el('a', { href: '/', class: 'heim_linkur'},
            el('strong', {class : 'title'}, 'Vefforritunarbúðin')))),
    el('div', {class: 'nav_haegri'},
      el('ul', {class: 'nav_uppi'},
          el('li', {}, el('a', {href: '/'}, 'Nýskrá')),
          el('li', {}, el('a', {href: '/'}, 'Innskrá')),
          el('li', {}, el('a', {href: '/'}, 'Karfa'))),
      el('ul', {class: 'nav_nidri'},
          el('li', {}, el('a', {href: '/'}, 'Nýjar vörur')),
          el('li', {}, el('a', {href: '?products=products'}, 'Vörulisti')),
          el('li', {}, el('a', {href: '?categories=categories'}, 'Flokkar')))
    )));

  const hlutur = await productSearch(id);

  if(!hlutur){
    console.warn('fann ekki hlutinn')
    return;
  }

  const showProduct = el(
    'div',
    { class: 'product'},
    el('img', {class: 'img', src: `${hlutur.image}`, alt: `${hlutur.title}`}),
    el(
      'section',
      { class: 'info'},
      el('h2', {class: 'nafn'}, `${hlutur.title}`),
      el('section', {class: 'verd_flokkur'},
        el('p', {}, `Flokkur: ${hlutur.category_title}`),
        el('p', {}, `Verð: ${hlutur.price} kr.-`)),
      el('section', {class: 'lysing'},
        el('p', {}, `${hlutur.description}`))
    ),
  );
  const meira = el('h2', {class: 'meira'}, `Meira úr ${hlutur.category_title}`);

  const blob = await alikeProducts(hlutur.category_id);

  const listis = el('section', {class: 'listi'});

  for( const hlutur2 of blob.items){
    const eihv = el(
      'div',
      { class: 'spil'},
      el('a', {href: `?id=${hlutur2.id}`},
      el('img', {class: 'mynd', src: `${hlutur2.image}`, alt: `${hlutur2.title}`}),
      el('div', {class: 'texti'},
        el('div', {class: 'titll_cate'},
          el('p', {class: 'titill'}, `${hlutur2.title}`), 
          el('p', {class: 'category'}, `${hlutur2.category_title}`)),  
        el('div', {class: 'verdd'},
          el('p', {class: 'verd'}, `${hlutur2.price}`, ' kr.-'))))
    );
    listis.appendChild(eihv);  
  }


  const container = el('main', {}, header, showProduct, meira, listis);
  parentElement.appendChild(container);

}


export async function renderCategories(parentElement){
  const header = el(
    'header',
    {class: 'header'},
    el('nav', { class: 'navi'}, 
      el('ul', {class: 'title'},
        el('li', {},
          el('a', { href: '/', class: 'heim_linkur'},
            el('strong', {class : 'title'}, 'Vefforritunarbúðin')))),
    el('div', {class: 'nav_haegri'},
      el('ul', {class: 'nav_uppi'},
          el('li', {}, el('a', {href: '/'}, 'Nýskrá')),
          el('li', {}, el('a', {href: '/'}, 'Innskrá')),
          el('li', {}, el('a', {href: '/'}, 'Karfa'))),
      el('ul', {class: 'nav_nidri'},
          el('li', {}, el('a', {href: '/'}, 'Nýjar vörur')),
          el('li', {}, el('a', {href: '?products=products'}, 'Vörulisti')),
          el('li', {}, el('a', {href: '?categories=categories'}, 'Flokkar')))
  )));

  const listi = el('section', {class: 'listi2'});
  const boxes = await allCatagories();

  for(const box of boxes){
    const category = el(
      'div',
      { class: 'boxess'},
      el('p', {class : 'box'}, el('a',{href: `?category=${box.id}`}, `${box.title}`))        
    );
    listi.appendChild(category);
  }
  const container = el('main', {}, header, listi);
  parentElement.appendChild(container);
}

export async function renderVorulisti(parentElement){
  const header = el(
    'header',
    {class: 'header'},
    el('nav', { class: 'navi'}, 
      el('ul', {class: 'title'},
        el('li', {},
          el('a', { href: '/', class: 'heim_linkur'},
            el('strong', {class : 'title'}, 'Vefforritunarbúðin')))),
    el('div', {class: 'nav_haegri'},
      el('ul', {class: 'nav_uppi'},
          el('li', {}, el('a', {href: '/'}, 'Nýskrá')),
          el('li', {}, el('a', {href: '/'}, 'Innskrá')),
          el('li', {}, el('a', {href: '/'}, 'Karfa'))),
      el('ul', {class: 'nav_nidri'},
          el('li', {}, el('a', {href: '/'}, 'Nýjar vörur')),
          el('li', {}, el('a', {href: '?products=products'}, 'Vörulisti')),
          el('li', {}, el('a', {href: '?categories=categories'}, 'Flokkar')))
  )));

  const jam = await allarVorur(100);
  const listis = el('section', {class: 'listi'});

  for( const hlutur of jam.items){
    const eihv = el(
      'div',
      { class: 'spil'},
      el('a', {href: `?id=${hlutur.id}`},
      el('img', {class: 'mynd', src: `${hlutur.image}`, alt: `${hlutur.title}`}),
      el('div', {class: 'texti'},
        el('div', {class: 'titll_cate'},
          el('p', {class: 'titill'}, `${hlutur.title}`), 
          el('p', {class: 'category'}, `${hlutur.category_title}`)),  
        el('div', {class: 'verdd'},
          el('p', {class: 'verd'}, `${hlutur.price}`, ' kr.-'))))
    );
    listis.appendChild(eihv);  
  }

  const container = el('main', {}, header, listis);
  parentElement.appendChild(container);

}

    