const cityOptions = {
    abia: ["Aba North", "Aba South", "Arochukwu", "Bende", "Isiala Ngwa South",
        "Ikwuano", "Isiala", "Ngwa North", "Ngwa South", "Isukwuato", "Ukwa North",
        "Ukwa West", "Ukwa East","Umuahia North","Umuahia South"
    ],
    abuja: ["Abaji", "Abuja Municipal", "Bwari", "Gwagwalada", "Kuje", "Kwali"
    ],
    adamawa: [
        "Demsa", "Fufore", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada",
        "Lamurde", "Madagali", "Maiha", "Mayo-Belwa", "Michika", "Mubi North",
        "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North",
        "Yola South"
    ],
    anambra: ["Aguata","Anambra","Anambra West","Anaocha","Awka South",
        "Awka North","Ogbaru","Onitsha South","Onitsha North","Orumba North",
        "Orumba South","Oyi"
    ],
    akwaibom: [
        "Abak", "Eastern Obolo", "Eket", "Essien Udim", "Etimekpo", "Etinan", 
        "Ibeno", "Ibesikpo Asutan", "Ibiono Ibom", "Ika", "Ikono", "Ikot Abasi", 
        "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat Enin", "Nsit Ibom", 
        "Nsit Ubium", "Obot Akara", "Okobo", "Onna", "Orukanam", "Oron", 
        "Udung Uko", "Ukanafun", "Esit Eket", "Uruan", "Urue Offoung", "Oruko Ete", 
        "Uyo"
    ],
    bauchi: [
        "Alkaleri", "Bauchi", "Bogoro", "Darazo", "Dass", "Gamawa", "Ganjuwa", 
        "Giade", "Jama`are", "Katagum", "Kirfi", "Misau", "Ningi", "Hira", 
        "Tafawa Balewa", "Itas gadau", "Toro", "Warji", "Zaki", "Dambam"
    ],
    bayelsa: [
        "Brass", "Ekeremor", "Kolok/Opokuma", "Nembe", "Ogbia", "Sagbama", 
        "Southern Ijaw", "Yenagoa", "Membe"
    ],
    benue: [
        "Ador", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", 
        "Gwer West", "Kastina-ala", "Konshisha", "Kwande", "Logo", "Makurdi", 
        "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", "Ukum", "Vandekya"
    ],
    borno: [
        "Abadan", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", 
        "Dikwagubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", 
        "Kalka/Balge", "Konduga", "Kukawa", "Kwaya-ku", "Mafa", "Magumeri", 
        "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"
    ],
    crossriver: [
        "Abia", "Akampa", "Akpabuyo", "Bakassi", "Bekwara", "Biase", "Boki", 
        "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", 
        "Odukpani", "Ogoja", "Ugep North", "Yala", "Yarkur"
    ],
    delta: [
        "Aniocha South", "Anioha", "Bomadi", "Burutu", "Ethiope West", 
        "Ethiope East", "Ika South", "Ika North East", "Isoko South", 
        "Isoko North", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", 
        "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli South", 
        "Ughelli North", "Ukwuani", "Uviwie", "Warri Central", "Warri North", 
        "Warri South"
    ],
    ebonyi: [
        "Abakaliki", "Afikpo South", "Afikpo North", "Ebonyi", "Ezza", 
        "Ezza South", "Ikwo", "Ishielu", "Ivo", "Ohaozara", "Ohaukwu", 
        "Onicha", "Izzi"
    ],
    edo: [
        "Akoko-Edo", "Egor", "Esan East", "Esan South East", "Esan Central", 
        "Esan West", "Etsako Central", "Etsako East", "Etsako", "Orhionwon", 
        "Ivia North", "Ovia South West", "Owan West", "Owan South", "Uhunwonde"
    ],
    ekiti: [
        "Ado Ekiti", "Effon Alaiye", "Ekiti South West", "Ekiti West", 
        "Ekiti East", "Emure/ise", "Orun", "Ido", "Osi", "Ijero", "Ikere", 
        "Ikole", "Ilejemeje", "Irepodun", "Ise/Orun", "Moba", "Oye", "Aiyekire"
    ],
    enugu: [
        "Awgu", "Aninri", "Enugu East", "Enugu South", "Enugu North", "Ezeagu",
        "Igbo Eze North", "Igbo Etiti", "Nsukka", "Oji River", "Udenu", "Uzo Uwani", "Udi"
    ],
    gombe: [
        "Akko", "Balanga", "Billiri", "Dukku", "Dunakaye", "Gombe", "Kaltungo",
        "Kwami", "Nafada/Bajoga", "Shomgom", "Yamaltu/Deba"
    ],
    imo: [
        "Aboh-Mbaise", "Ahiazu-Mbaise", "Ehime-Mbaino", "Ezinhite", 
        "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala", 
        "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nwangele", "Nkwere", 
        "Obowo", "Aguta", "Ohaji Egbema", "Okigwe", "Onuimo", "Orlu", 
        "Orsu", "Oru West", "Oru", "Owerri", "Owerri North", "Owerri South"
    ],
    jigawa: [
        "Auyo", "Babura", "Birnin-Kudu", "Birniwa", "Buji", "Dutse", "Garki",
        "Gagarawa", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadeji", "Jahun",
        "Kafin-Hausa", "Kaugama", "Kazaure", "Kirikasamma", "Birnin-Magaji",
        "Maigatari", "Malamaduri", "Miga", "Ringim", "Roni", "Sule Tankarkar",
        "Taura", "Yankwasi"
    ],
    kaduna: [
        "Birnin Gwari", "Chikun", "Giwa", "Kajuru", "Igabi", "Ikara", "Jaba",
        "Jema`a", "Kachia", "Kaduna North", "Kaduna South", "Kagarok", "Kauru",
        "Kabau", "Kudan", "Kere", "Makarfi", "Sabongari", "Sanga", "Soba",
        "Zangon-Kataf", "Zaria"
    ],
    kano: [
        "Ajigi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", 
        "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", 
        "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", 
        "Gwarzo", "Kano", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", 
        "Kura", "Maidobi", "Makoda", "Minjibir", "Nassarawa", "Rano", 
        "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", 
        "Tofa", "Tsanyawa", "Tudunwada", "Ungogo", "Warawa", "Wudil"
    ],
    kastina: [
        "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi",
        "Dan-Musa", "Dandume", "Danja", "Daura", "Dutsi", "Dutsin-Ma",
        "Faskari", "Funtua", "Ingawa", "Jibiya", "Kafur", "Kaita", "Kankara",
        "Kankiya", "Katsina", "Furfi", "Kusada", "Mai Aduwa", "Malumfashi",
        "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana",
        "Sandamu", "Zango"
    ],
    kebbi:  [
        "Aliero", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi",
        "Bunza", "Dandi", "Danko", "Fakai", "Gwandu", "Jeda", "Kalgo",
        "Koko-Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru",
        "Wasagu", "Yauri", "Zuru"
    ],
    kogi: [
        "Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Yagba East", "Ibaji",
        "Idah", "Igalamela", "Ijumu", "Kabba Bunu", "Kogi", "Mopa Muro", "Ofu",
        "Ogori Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba West"
    ],
    kwara: [
        "Asa", "Baruten", "Ede", "Ekiti", "Ifelodun", "Ilorin South", 
        "Ilorin West", "Ilorin East", "Irepodun", "Isin", "Kaiama", "Moro", 
        "Offa", "Oke Ero", "Oyun", "Pategi"
    ],
    lagos: [
        "Agege", "Alimosho Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", 
        "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako/Ijaye", "Ikeja", 
        "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", 
        "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ],
    nasarawa: [
        "Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", 
        "Lafia", "Nasarawa", "Nasarawa/Eggon", "Obi", "Toto", "Wamba"
    ],
    niger: [
        "Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchanga", "Edati",
        "Gbako", "Gurara", "Kitcha", "Kontagora", "Lapai", "Lavun", "Magama",
        "Mariga", "Mokwa", "Moshegu", "Muya", "Paiko", "Rafi", "Shiroro",
        "Suleija", "Tawa-Wushishi"
    ],
    ogun: [
        "Abeokuta South", "Abeokuta North", "Ado-Odo/Otta", "Agbado South", 
        "Agbado North", "Ewekoro", "Idarapo", "Ifo", "Ijebu East", "Ijebu North", 
        "Ikenne", "Ilugun Alaro", "Imeko Afon", "Ipokia", "Obafemi/owode", 
        "Odeda", "Odogbolu", "Ogun Waterside", "Sagamu"
    ],
    ondo: [
        "Akoko North", "Akoko North East", "Akoko South East", "Akoko South",
        "Akure North", "Akure", "Idanre", "Ifedore", "Ese Odo", "Ilaje",
        "Ilaje Oke-Igbo", "Irele", "Odigbo", "Okitipupa", "Ondo", "Ondo East",
        "Ose", "Owo"
    ],
    osun: [
        "Atakumosa West", "Atakumosa East", "Ayeda-Ade", "Ayedire", "Bolawaduro",
        "Boripe", "Ede", "Ede North", "Egbedore", "Ejigbo", "Ife North",
        "Ife Central", "Ife South", "Ife East", "Ifedayo", "Ifelodun", "Ilesha West",
        "Ila-Orangun", "Ilesha East", "Irepodun", "Irewole", "Isokan", "Iwo",
        "Obokun", "Odo-Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"
    ],
    oyo: [
        "Afijio", "Akinyele", "Attba", "Atigbo", "Egbeda", "Ibadan",
        "Ibadan North East", "Ibadan Central", "Ibadan South East", 
        "Ibadan West South", "Ibarapa East", "Ibarapa North", "Ido", 
        "Ifedapo", "Ifeloju", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", 
        "Iwajowa Olorunshogo", "Kajola", "Lagelu", "Ogbomosho North", 
        "Ogbomosho South", "Ogo Oluwa", "Oluyole", "Ona Ara", "Orelope", 
        "Orire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"
    ],
    plateau: [
        "Barkin/Ladi", "Bassa", "Bokkos", "Jos North", "Jos East", "Jos South",
        "Kanam", "Kiyom", "Langtang North", "Langtang South", "Mangu", "Mikang",
        "Pankshin", "Qua'an Pan", "Shendam", "Wase"
    ],
    rivers: [
        "Abua/Odual", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", 
        "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", 
        "Oyigbo", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", 
        "Okrika", "Omuma", "Opobo/Nkoro", "Port Harcourt", "Tai"
    ],
    sokoto: [
        "Binji", "Bodinga", "Dange/Shuni", "Gada", "Goronyo", "Gudu", 
        "Gwadabawa", "Illela", "Kebbe", "Kware", "Rabah", "Sabon-Birni", 
        "Shagari", "Silame", "Sokoto South", "Sokoto North", "Tambuwal", 
        "Tangaza", "Tureta", "Wamakko", "Wurno", "Yabo"
    ],
    taraba: [
        "Ardo-Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", 
        "Jalingo", "Lamido", "Kurmi", "Lan", "Sardauna", "Tarum", 
        "Ussa", "Wukari", "Yorro", "Zing"
    ],
    yobe: [
        "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gogaram", 
        "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", 
        "Nguru", "Potiskum", "Tarmua", "Yunusari", "Yusufari", "Gashua"
    ],
    zamfara: [
        "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", 
        "Chafe", "Gummi", "Gusau", "Isa", "Kaura Namoda", "Maradun", 
        "Maru", "Shinkafi", "Talata Mafara", "Zumi"
    ],
};

export {cityOptions}