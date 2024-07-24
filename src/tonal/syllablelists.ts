export function isInSyllableTable(syllable: string) {
  if (basicSyllables.includes(syllable)) return true;
  if (missingSyllables.includes(syllable)) return true;
  if (syllabicHeadwords.includes(syllable)) return true;
  if (syllabicLoanwords.includes(syllable)) return true;
  if (addonSyllables.includes(syllable)) return true;
  return false;
}

// prettier-ignore
const toBeVerified = [
    'baih', 'buhh', 'burhh',
    
    'cett', 'changxx', 'chua', 'chiauhh', 'chiuh', 'chiunnh', 'ciauhh', 'cuaihh',

    'chueh',

    'giakk', 'gutt',
    
    'huangz',

    'iakk',

    'jex', 'jik', 'jing', 'jirnx', 'jirtt', 'juany',

    'ker', 'kerh', 'ket',

    'kirinnx', 'kuinnx', 'kanh', 'kih', 'kngh', 'kuaix', 'kuaiz', 'kuakk', 'kuangz', 'kuatt',

    'khanx', 'khangx', 'khihh', 'khiaih', 'khiauhh', 'khomz', 'khop', 'khirh', 'khuannx',

    'len', 'liakk', 'lirey',

    // syllabic headwords
    'luai',

    'mah', 'mol',

    'na', 'niw', 'nuaiw',

    'ngihh', 'nguiy',

    'pann', 'pihh', 'pirt', 'penw', 'phitt',

    'sauhh', 'sokk',

    'thuehh', 'thom', 'thomz', 'tiangy', 'tionny', 'tom',

    'tirinn',

    'uehh',

]

// prettier-ignore
const addonSyllables = [
    'ainn', 'ainny', 'ainnx', 'anny', 'aunn', 'aunny', 'aunnz',

    'berh', 'berhh', 'berx', 'bery', 'berz',

    'cainn', 'cainny', 'cainnw', 'cainnx', 'cannh', 'cennh', 'cennx', 'cennz', 'cennhh', 'cer', 'cerh', 'cerw', 'cerx', 'cery', 'cerz', 'cinnw', 'cinnh', 'cinnz', 'cir', 'cirinn', 'cirinny', 'cirw', 'ciry', 'cirx', 'cuanny', 'cuannw', 'cuannz', 'cuinn', 'cuinny', 'cuinnw',

    'chainn', 'chainnw', 'chainnx', 'channw', 'channx', 'chennx', 'cher', 'chereh', 'cherehh', 'cherew', 'cherex', 'cherez', 'cherh', 'cherhh', 'cherw', 'cherz', 'chir', 'chirinny', 'chirinnx', 'chirm', 'chirw', 'chiry', 'chirx', 'chirz', 'chiunnx', 'chm', 'chuinn', 'chuinny', 'chuinnw', 'chuinnx', 'chuinnz',

    'tainny', 'tainnw', 'tainnx', 'tainnz', 'tainnhh', 'tenny', 'tennx', 'terex', 'terey', 'terez', 'terh', 'terhh', 'terw', 'tery', 'terz', 'tiann', 'tiannw', 'tinnh', 'tinnw', 'tir', 'tirinnw', 'tirinnz', 'tirw', 'tirx', 'tirz', 'tuanny', 'tuinny', 'tuinnw', 'tuinnx', 'tuinnz',

    'enny', 'ennh', 'ennz', 'ennhh', 'er', 'ere', 'erehh', 'erex', 'erey', 'erez', 'erh', 'erw', 'erx', 'erz',

    'gereh', 'gerehh', 'gerhh', 'gerex', 'gerez', 'gerx', 'giauh', 'girnx', 'girnz', 'girt', 'girx', 'giry', 'girz',
	
    'hainny', 'hainnh', 'hainnz', 'hann', 'hannhh', 'henny', 'hennz', 'hennhh', 'her', 'herez', 'herw', 'herx', 'hery', 'herz', 'haunn', 'haunny', 'haunnw', 'haunnh', 'haunnx', 'haunnhh', 'hinnh', 'hinnx', 'hir', 'hirinnx', 'hirinnz', 'hirny', 'hirnz', 'hirw', 'hirx', 'hiry', 'hirtt', 'hirk', 'hiunny', 'hiunnw', 'hiunnz', 'hmhh', 'hmz', 'hngw', 'huainnh', 'huannw', 'honnz', 'hop', 'huinn', 'huinnh', 'huinnx', 'huinnz',

    'ionn', 'innh', 'innhh', 'ir', 'irinnx', 'irn', 'irny', 'irpp', 'irw', 'irx', 'iry', 'irz',

    'jiaunny', 'jiaunnw', 'jiaunnx', 'jinny', 'jiry', 'jirx', 'jerx',
	
	'khannx', 'khainnh', 'khainnw', 'khaunnhh', 'khennh', 'khennx', 'kher', 'khere', 'khereh', 'kherew', 'kherw', 'kherh', 'kherx', 'khiann', 'khiannw', 'khinn', 'khir', 'khirnx', 'khirny', 'khirw', 'khngz', 'khuainn', 'khuainnw', 'khonny', 'khuinnw',

    'lerehh', 'lerex', 'lerh', 'lerx', 'liry', 'lirx', 'lirz', 'lngh', 

    'maix', 'mih', 'mihh', 'mng', 'muaix', 'muaiz', 'muex', 'muez', 'mui', 'muiz',

    'naih', 'naix', 'ney', 'new', 'nez', 'nehh', 'niauw', 'niauh', 'niaw', 'nirix', 'niriz', 'niu', 'nox', 'nui', 'nuiy', 'nuiw', 'nuix', 'nuiz',

    'ngai', 'ngaiy', 'ngauy', 'ngauh', 'ngauhh', 'ngaw', 'ngaz', 'nge', 'ngh', 'nghh', 'ngiahh', 'ngiriy', 'ngiuy', 'ngiux', 'ngiz', 'ngueh', 'nguehh',

    'uainn', 'uainnh', 'uainnz', 'uainnhh', 'uannx',

    'phainn', 'phennw', 'pher', 'pherhh', 'pherw', 'pherx', 'pherz', 'phinny', 'phinnhh', 'phng', 'phngy', 'phngw', 'phngz', 'phnghh', 'phuannx', 'phonn', 'phuinn', 'phuinnw', 'phuinnx',
	
	'kainny', 'kainnw', 'kainnz', 'kannhh', 'kere', 'kereh', 'kerew', 'kerex', 'kerey', 'kerez', 'kerh', 'kerw', 'kery', 'kiaunnhh', 'kinny', 'kinnh', 'kinnhh', 'kir', 'kirinn', 'kirinny', 'kirn', 'kirnw', 'kirnz', 'kirw', 'kirx', 'kiry', 'kirz', 'kiunnx', 'kiunnz', 'knghh', 'kuainnw', 'kuainnx', 'kuainnhh', 'kuannw', 'kuenny', 'konnz', 'kuinn', 'kuinny', 'kuinnw',

    'sainn', 'sanny', 'sannw', 'sannx', 'sere', 'serew', 'serew', 'serh', 'serhh', 'serx', 'serw', 'serz', 'sinnx', 'sinnhh', 'sir', 'sirinn', 'sirm', 'sirp', 'sirw', 'sirx', 'siry', 'sirz', 'sm', 'smw', 'smh', 'snghh', 'suainn', 'suainnh', 'suainnx', 'suainnhh', 'suenn', 'suenny', 'suennw', 'suinn', 'suinny', 'suinnw',

    'thainnw', 'thainnz', 'thannx', 'thannz', 'thenn', 'ther', 'there', 'therehh', 'therew', 'therhh', 'therw', 'thinnw', 'thinnx', 'thirx', 'thiry', 'thiunny', 'thuannx', 'thuinnw', 'thuinnx', 'thuinnz',

    'uihh', 'uinn', 'uinny', 'uinnx', 'uinnz',

    'painny', 'painnx', 'painnz', 'per', 'pery', 'perw', 'perx', 'perz', 'pinnx', 'pngx', 'puinn', 'puinny', 'puinnx', 'puinnz',
]

// prettier-ignore
export const syllabicLoanwords = [
    'jiny',

    'meny',
    
    'oh',

    'phop',
]

export const syllabicHeadwords = ['er', 'ir'];

// prettier-ignore
export const missingSyllables = [    
    'aih',
    
    'buaix', 'buaiw', 'bueh', 'burh',

    'cuaih',
    
    'chuainn', 'chuatt',
    
    'tngh',

    'en',

    'geh', 'gehh', 'gih', 'giuh', 'gimw', 'gipp', 'gueh', 'gunx', 'guny',

    'homz', 'huainn', 'huih',

    'jih', 'jip',

	'kenz', 'khuih',

    'laih', 'langh', 'lip', 'lih', 'lit', 'litt', 'luaih', 'luaiz', 'lueh',

    'mnghh',

    'n',

    'ngh',

    'op',

    'pheh',

    'sangh', 'sennh', 'sienh', 'sinnh',

    'tenz', 'thomx', 'tueh'
]

// prettier-ignore
export const basicSyllables = [
    'a', 'ay', 'az', 'ah', 'ahh', 'ai', 'aiy', 'aiw', 'ainnz', 'ak', 'am',
    'amy', 'amw', 'amx', 'amz', 'an', 'any', 'anw', 'anx', 'anz', 'ang',
    'angw', 'angx', 'angz', 'annw', 'annx', 'annz', 'ap', 'app', 'at', 'au',
    'auy', 'auw', 'aux', 'auz',

    'ba', 'bax', 'baz', 'bah', 'bai', 'baiy', 'baix', 'bak', 'bakk', 'ban',
    'bany', 'banx', 'banz', 'bangy', 'bangw', 'bangx','bangz', 'bat', 'batt',
    'bauy', 'bauz', 'bey', 'bex', 'bez', 'beh', 'behh', 'biy', 'bix', 'biz',
    'bieny', 'bienx', 'bienz','biett', 'biauy', 'biaux', 'biauz', 'bih',
    'bihh', 'bikk', 'biny', 'binx', 'binz', 'bingy', 'bingx', 'bingz', 'biury',
    'biurx','biurz', 'bitt', 'biuz', 'bury', 'burx', 'burz', 'bok', 'bokk',
    'bong', 'bongy', 'bongw', 'bongx', 'bongz', 'boy', 'box', 'boz', 'buy',
    'bux', 'buz', 'buax', 'buah', 'buahh', 'buany', 'buatt', 'buey', 'buex',
    'buez', 'buehh', 'bui', 'buny', 'bunw', 'bunx', 'bunz', 'but', 'butt',
    
    'ca', 'cay', 'cax', 'caz', 'cah', 'cai', 'caiy', 'caiw', 'caix', 'caiz',
    'cak', 'cakk', 'cam', 'camy', 'camw', 'camx', 'can', 'canw', 'canx',
    'cang', 'cangy', 'cangw', 'canny', 'cannz', 'cap', 'capp', 'cat', 'catt',
    'cau', 'cauy', 'cauw', 'cauhh', 'ce', 'cey', 'cew', 'cex', 'cez', 'ceh',
    'cenn', 'cenny', 'cennw', 'ci', 'ciy', 'ciw', 'cix', 'ciz', 'cia', 'ciax',
    'ciah', 'ciakk', 'ciam', 'ciamy', 'cien', 'cieny', 'cienx', 'ciangy',
    'ciangw', 'ciangx', 'ciangz', 'ciann', 'cianny', 'ciannw', 'ciannx', 'ciap',
    'ciet', 'ciau', 'ciauw', 'ciaux', 'cih', 'cihh', 'cik', 'cikk', 'cim',
    'cimy', 'cin', 'cinw', 'cing', 'cingy', 'cingw', 'cingx', 'cingz', 'cinn',
    'cinny', 'cinnx', 'ciur', 'ciurw', 'ciurz', 'ciurh', 'ciurhh', 'ciok',
    'ciokk', 'ciong', 'ciongw', 'cip', 'cit', 'ciu', 'ciuy', 'ciux', 'ciuz',
    'ciunn', 'ciunny', 'ciunnw', 'ciunnx', 'ciunnz', 'cng', 'cngy', 'cngw',
    'cngx', 'cngh', 'cnghh', 'cur', 'cury', 'curw', 'curh', 'cok', 'cokk',
    'cong', 'congy', 'congw', 'congx', 'co', 'coy', 'cow', 'cu', 'cuy', 'cuw',
    'cuz', 'cuaw', 'cuaz', 'cuah', 'cuahh', 'cuan', 'cuany', 'cuanw', 'cuanx',
    'cuangw', 'cuann', 'cuannw', 'cue', 'cuey', 'cuex',   'cuez', 'cuh', 'cuhh',
    'cui', 'cuiy', 'cuiw', 'cun', 'cuny', 'cunw', 'cunx', 'cunz', 'cut',

    'cha', 'chay', 'chaw', 'chah', 'chahh', 'chai', 'chaiy', 'chaiw', 'chaix',
    'chaiz', 'chainny', 'chak', 'chakk', 'cham', 'chamy', 'chamw', 'chamz',
    'chan', 'chany', 'chanw', 'chanx', 'chanz', 'chang', 'changy', 'changw',
    'changx', 'channy', 'channz', 'chapp', 'chat', 'chatt', 'chau', 'chauy',
    'chauw', 'chaux', 'chauz', 'che', 'chey', 'chew', 'chex', 'chez', 'cheh',
    'chehh', 'chenn', 'chenny', 'chennw', 'chennz', 'chi', 'chiy', 'chiw',
    'chix', 'chiz', 'chia', 'chiay', 'chiaw', 'chiaz', 'chiah', 'chiahh',
    'chiam', 'chiamw', 'chiamx', 'chiamz', 'chien', 'chieny', 'chienw',
    'chienx', 'chienz', 'chiang', 'chiangy', 'chiangw', 'chiann', 'chianny',
    'chiannw', 'chiannx', 'chiannz', 'chiap', 'chiapp', 'chiet', 'chiett',
    'chiau', 'chiauy', 'chiauw', 'chiaux', 'chih', 'chihh', 'chik', 'chikk',
    'chim', 'chimy', 'chimw', 'chimx', 'chin', 'chiny', 'chinw', 'chinx',
    'chinz', 'ching', 'chingy', 'chingw', 'chingx', 'chingz', 'chinn',
    'chinny', 'chinnw', 'chinnx', 'chinnz', 'chiur', 'chiury', 'chiurw',
    'chiurh', 'chiurhh', 'chiok', 'chiong', 'chiongy', 'chiongw', 'chiongx',
    'chiongz', 'chip', 'chipp', 'chit', 'chitt', 'chiu', 'chiuy', 'chiuw',
    'chiuz', 'chiunn', 'chiunny', 'chiunnw', 'chiunnz', 'chng', 'chngy',
    'chngw', 'chngx', 'chngz', 'chur', 'chury', 'churw', 'churx', 'churz',
    'churh', 'chok', 'chokk', 'chong', 'chongy', 'chongw', 'chongx', 'chongz',
    'cho', 'choy', 'choz', 'chu', 'chuy', 'chuw', 'chux', 'chuz', 'chuay',
    'chuax', 'chuaz', 'chuah', 'chuahh', 'chuainnz', 'chuan', 'chuany',
    'chuanw', 'chuanx', 'chuanz', 'chuann', 'chuanny', 'chuannw', 'chuannx',
    'chuannz', 'chuat', 'chuew', 'chuez', 'chuh', 'chui', 'chuiy', 'chuiw',
    'chuix', 'chuiz', 'chun', 'chuny', 'chunw', 'chunx', 'chunz', 'chut',
    'chutt', 

    'e', 'ey', 'ew', 'ex', 'ez', 'eh', 'ehh', 'enn', 'ennx',

    'ik', 'ikk',

    'gax', 'gaz', 'gaix', 'gaiz', 'gakk', 'gamy', 'gamx', 'gamz', 'gany',
    'ganw', 'ganx', 'ganz', 'gangz', 'gaux', 'gew', 'gex', 'gez', 'giy', 'gix',
    'giz', 'giax','giah', 'giahh', 'giamy', 'giamx', 'giamz', 'gieny', 'gienw',
    'gienx', 'gienz', 'giang', 'giangw', 'giangz', 'giap', 'giapp', 'giet',
    'giett', 'giaux', 'gikk', 'gimy', 'gimx', 'gimz', 'giny', 'ginx', 'ginz',
    'gingy', 'gingx', 'giury', 'giurx', 'giurhh', 'giok', 'giokk', 'giongy',
    'giuy', 'giux', 'gurx', 'gurz', 'gokk', 'gongx', 'gongz', 'gox', 'goz',
    'guy', 'gux', 'guz', 'guay', 'guaz', 'guany', 'guanx', 'guanz', 'guatt',
    'guez', 'guehh', 'guix', 'guiz',
    
    'ha', 'haw', 'hax', 'haz', 'hah', 'hahh', 'hai', 'haiy', 'haix', 'haiz',
    'hainn', 'hainnw', 'hainnx', 'hak', 'hakk', 'ham', 'hamy', 'hamw', 'hamx',
    'hamz','han', 'hany', 'hanw', 'hanx', 'hanz', 'hang', 'hangw', 'hangx',
    'hangz', 'hanny', 'hannx', 'hannz', 'hannh', 'hap', 'happ', 'hat', 'hatt',
    'hau', 'hauy', 'hauw', 'haux', 'hauz', 'he', 'hey', 'hew', 'hex', 'hez',
    'heh', 'hennw', 'hennx', 'hennh', 'hi', 'hiy', 'hiw','hix', 'hia', 'hiaz',
    'hiah', 'hiahh', 'hiam', 'hiamy', 'hiamw', 'hiamx', 'hien', 'hieny',
    'hienw', 'hienx', 'hienz', 'hiang', 'hiangy', 'hiangw', 'hiann', 'hianny',
    'hiannw', 'hiannx', 'hiannz', 'hiannh', 'hiapp', 'hiet', 'hiett', 'hiau',
    'hiauy', 'hiaux', 'hiauh', 'hik', 'hikk', 'him', 'himx', 'hin', 'hinx',
    'hinz', 'hing', 'hingw', 'hingx', 'hingz', 'hinn', 'hinnw', 'hinnz',
    'hiurx', 'hiurz', 'hiurh', 'hiurhh', 'hiok', 'hiong', 'hiongy', 'hiongw',
    'hiongx', 'hip','hit', 'hitt', 'hiu', 'hiuy', 'hiuw', 'hiux', 'hiunn',
    'hiunnhh', 'hmy', 'hmx', 'hmh', 'hmhh', 'hng', 'hngy', 'hngx', 'hngz',
    'hngh', 'hnghh', 'hury', 'hurx', 'hurz', 'hurhh', 'hok', 'hokk', 'hong',
    'hongy', 'hongw', 'hongx', 'hongz', 'honn', 'honny', 'honnw', 'honnh', 'ho',
    'hoy', 'how', 'hox', 'hoz', 'hu', 'huy', 'huw', 'hux', 'huz', 'hua', 'huaw',
    'huax', 'huaz', 'huah', 'huahh', 'huaix', 'huaiz', 'huainnx', 'huan',
    'huany', 'huanw', 'huanx', 'huanz', 'huann', 'huanny', 'huannx', 'huannz',
    'huat', 'huatt', 'hue', 'huey', 'huew', 'huex', 'huez', 'hueh', 'hui',
    'huiy', 'huiw', 'huix', 'huiz', 'hun', 'huny', 'hunw', 'hunx', 'hunz',
    'hut', 'hutt',

    'i', 'iy', 'iw', 'ix', 'iz', 'ia', 'iay', 'iaw', 'iax', 'iaz', 'iah',
    'iahh', 'iam', 'iamy', 'iamx', 'iamz', 'ien', 'ieny', 'ienw', 'ienx',
    'iang', 'iangz', 'iann', 'ianny', 'iannw', 'iannx', 'iannz', 'iap', 'iapp',
    'iet', 'iett', 'iau', 'iauy', 'iauw', 'iaux', 'iauz', 'iaunn', 'im', 'imy',
    'imw', 'imx', 'in', 'iny', 'inw', 'inx', 'inz', 'ing', 'ingy', 'ingw',
    'ingx', 'ingz', 'inn', 'inny', 'innw', 'innx', 'innz', 'iur', 'iury',
    'iurx', 'iurh', 'iurhh', 'iok', 'iokk', 'iong', 'iongy', 'iongw', 'iongx',
    'iongz', 'ip', 'it', 'itt', 'iu', 'iuy', 'iuw', 'iux', 'iuz', 'iunn',
    'iunny', 'iunnx', 'iunnz',

    'jiy', 'jix', 'jiz', 'jia', 'jiay', 'jiamy', 'jienx', 'jiangy', 'jiapp',
    'jiett', 'jiauy', 'jiauw', 'jiaux', 'jimy', 'jimx', 'jimz', 'jinx', 'jinz',
    'jiurz', 'jiok', 'jiokk', 'jiongy', 'jiongx', 'jiongz', 'jipp', 'jitt',
    'jiux', 'juy', 'jux', 'juz', 'juahh', 'juex', 'juez', 'junz',

    'ka', 'kay', 'kaw', 'kaz', 'kah', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainnx',
    'kak', 'kakk', 'kam', 'kamy', 'kamw', 'kamx', 'kan', 'kany', 'kanw', 'kang',
    'kangy', 'kangw', 'kangx', 'kangz', 'kann', 'kanny', 'kannw', 'kannx',
    'kap', 'kat', 'kau', 'kauy', 'kauw', 'kaux', 'kauz', 'kauh', 'ke', 'key',
    'kew', 'kez', 'keh', 'kehh', 'kenn', 'kenny', 'kennw', 'ki', 'kiy', 'kiw',
    'kix', 'kiz', 'kia', 'kiaw', 'kiaz', 'kiahh', 'kiam', 'kiamy', 'kiamw',
    'kiamx', 'kien', 'kieny', 'kienw', 'kienz', 'kiann', 'kianny', 'kiannw',
    'kiannx', 'kiannz', 'kiap', 'kiet', 'kiett', 'kiau', 'kiauy', 'kiaux',
    'kiauz', 'kik', 'kikk', 'kim', 'kimy', 'kimw', 'kimz', 'kin', 'kiny',
    'kinw', 'kinz', 'king', 'kingy', 'kingw', 'kingx', 'kingz', 'kinn', 'kinnw',
    'kinnx', 'kiurw', 'kiurx', 'kiurz', 'kiurh', 'kiok', 'kiokk', 'kiong',
    'kiongy', 'kiongx', 'kiongz', 'kip', 'kipp', 'kitt', 'kiu', 'kiuy', 'kiuw',
    'kiux', 'kiuz', 'kiunn', 'kng', 'kngy', 'kngw', 'kur', 'kury', 'kurw',
    'kurx', 'kurz', 'kurh', 'kok', 'kokk', 'kong', 'kongy', 'kongw', 'kongx',
    'konnx', 'ko', 'koy', 'kow', 'kox', 'koz', 'ku', 'kuy', 'kuw', 'kuz', 'kua',
    'kuay', 'kuaw', 'kuaz', 'kuah', 'kuai', 'kuaiy', 'kuaiw', 'kuainn',
    'kuainny', 'kuainnz', 'kuan', 'kuany', 'kuanw', 'kuanx', 'kuanz', 'kuann',
    'kuanny', 'kuannx', 'kuannz', 'kuat', 'kue', 'kuey', 'kuew', 'kueh', 'kui',
    'kuiy', 'kuiw', 'kuix', 'kuiz', 'kun', 'kuny', 'kunw', 'kunx', 'kunz',
    'kut', 'kutt',

    'kha', 'khay', 'khaw', 'khah', 'khahh', 'khai', 'khaiy', 'khaiw', 'khainn',
    'khainny', 'khak', 'khakk', 'kham', 'khamy', 'khamw', 'khan', 'khanw',
    'khang', 'khangy', 'khangw', 'khann', 'khap', 'khapp', 'khat', 'khau',
    'khauy', 'khauw', 'khe', 'khey', 'khew', 'khex', 'kheh', 'khehh', 'khenn',
    'khennhh', 'khi', 'khiy', 'khiw', 'khix', 'khiz', 'khia', 'khiax', 'khiaz',
    'khiah', 'khiakk', 'khiam', 'khiamw', 'khiamx', 'khiamz', 'khien', 'khieny',
    'khienw', 'khienx', 'khiang', 'khiangw', 'khiap', 'khiet', 'khiett',
    'khiau', 'khiauy', 'khiauw', 'khiauh', 'khih', 'khik', 'khim', 'khimy',
    'khimx', 'khin', 'khiny', 'khinx', 'khing', 'khingy', 'khingw', 'khingx',
    'khingz', 'khinnx', 'khiury', 'khiurw', 'khiurh', 'khiok', 'khiong',
    'khiongy', 'khiongx', 'khip', 'khipp', 'khit', 'khitt', 'khiu', 'khiuy',
    'khiux', 'khiuz', 'khiunn', 'khiunnz', 'khng', 'khngw', 'khur', 'khury',
    'khurw', 'khurx', 'khok', 'khokk', 'khong', 'khongy', 'khongw', 'khongz',
    'kho', 'khoy', 'khow', 'khu', 'khux', 'khuz', 'khua', 'khuay', 'khuaw',
    'khuah', 'khuaiw', 'khuan', 'khuany', 'khuanw', 'khuanx', 'khuann',
    'khuanny', 'khuannw', 'khuat', 'khue', 'khuew', 'khuex', 'khueh', 'khuh',
    'khui', 'khuiy', 'khuiw', 'khun', 'khuny', 'khunw', 'khunx', 'khut',
    'khutt',

    'la', 'lax', 'laz', 'lah', 'lahh', 'laix', 'laiz', 'lak', 'lakk', 'lam',
    'lamy', 'lamw', 'lamx', 'lamz', 'lan', 'lany', 'lanx', 'lanz', 'lang',
    'langy', 'langw', 'langx', 'langz', 'lap', 'lapp', 'latt', 'lauy', 'lauw',
    'laux', 'lauz', 'lauhh', 'le', 'ley', 'lew', 'lex', 'lez', 'leh', 'lehh',
    'li', 'liy', 'liw', 'lix', 'liz', 'liah', 'liahh', 'liam', 'liamy', 'liamw',
    'liamx', 'liamz', 'lien', 'lieny', 'lienx', 'lienz', 'liang', 'liangy',
    'liangx', 'liangz', 'liap', 'liapp', 'liett', 'liauy', 'liauw', 'liaux',
    'liauz', 'lihh', 'lik', 'likk', 'lim', 'limy', 'limx', 'limz', 'lin',
    'liny', 'linw', 'linx', 'limz', 'ling', 'lingy', 'lingw', 'lingx', 'lingz',
    'liury', 'liurx', 'liurz', 'liurhh', 'liok', 'liokk', 'liongy', 'liongw',
    'liongx', 'liongz', 'lipp', 'liu', 'liuy', 'liuw', 'liux', 'liuz', 'lng',
    'lngy', 'lngw', 'lngx', 'lngz', 'lur', 'lury', 'lurw', 'lurx', 'lurz',
    'lurh', 'lurhh', 'lok', 'lokk', 'long', 'longy', 'longw', 'longx', 'longz',
    'loy', 'lox', 'loz', 'lu', 'luy', 'luw', 'lux', 'luz', 'luax', 'luaz',
    'luah', 'luahh', 'luany', 'luanx', 'luanz', 'luatt', 'luex', 'luez', 'lui',
    'luiy', 'luiw', 'luix', 'luiz', 'lun', 'luny', 'lunx', 'lunz', 'lut',
    'lutt',

    'my', 'mx', 'mz', 'ma', 'may', 'maw', 'max', 'maz', 'mai', 'maiy', 'maiw',
    'maiz', 'mau', 'maux', 'mauz', 'mauh', 'me', 'mey', 'mex', 'mez', 'meh',
    'mehh', 'mi', 'miy', 'mix', 'miz', 'miax', 'miaz', 'miauz', 'mih', 'mihh',
    'mngy', 'mngx', 'mngz', 'mo', 'moy', 'mox', 'moz', 'moh', 'mohh', 'mua',
    'muay', 'muax', 'muaz', 'muiy', 'muix',

    'nay', 'naw', 'nax', 'naz', 'nah', 'nai', 'naiy', 'naiz', 'nauy', 'nauz',
    'nauh', 'ne', 'nex', 'neh', 'ni', 'niy', 'nix', 'niz', 'niay', 'niax',
    'niaz', 'niau', 'niauy', 'nih', 'niuy', 'niux', 'niuz', 'noy', 'noz',
    'nuay', 'nuaw', 'nuax', 'nuaz',

    'ng', 'ngy', 'ngw', 'ngx', 'ngz', 'ngay', 'ngaiz', 'ngaux', 'ngauz', 'ngey',
    'ngez', 'ngeh', 'ngehh', 'ngiax', 'ngiau', 'ngiauy', 'ngiauh', 'ngiauhh',
    'ngoy', 'ngox', 'ngoz',

    'o', 'oy', 'ox', 'oz', 'ok', 'om', 'omz', 'ong', 'ongy', 'ongx', 'ongz',
    'onn', 'onnw', 

    'pa', 'pay', 'paw', 'pax', 'paz', 'pah', 'pai', 'paiy', 'paiw', 'paix',
    'paiz', 'pak', 'pakk', 'pan', 'pany', 'panx', 'panz', 'pang', 'pangy',
    'pangw', 'pangx', 'pat', 'patt', 'pau', 'pauy', 'paux', 'pauz', 'pe', 'pey',
    'pew', 'pex', 'pez', 'peh', 'pehh', 'penn', 'pennw', 'pennx', 'pennz', 'pi',
    'piy', 'piw', 'pix', 'piz', 'piah', 'piak', 'piakk', 'pien', 'pieny',
    'pienw', 'pienz', 'piangw', 'piangz', 'piann', 'pianny', 'piannw', 'piannx',
    'piet', 'piett', 'piau', 'piauy', 'pih', 'pik', 'pikk', 'pin', 'piny',
    'pinw', 'pinx', 'ping', 'pingy', 'pingw', 'pingx', 'pingz', 'pinn', 'pinny',
    'pinnw', 'pinnz', 'piur', 'piury', 'piurz', 'pit', 'pitt', 'piu', 'png',
    'pngy', 'pngz', 'pur', 'pury', 'purw', 'purx', 'purz', 'purh', 'purhh',
    'pok', 'pokk', 'pongy', 'pongw', 'pongx', 'pongz', 'po', 'poy', 'pow',
    'pox', 'poz', 'pu', 'puw', 'pux', 'puz', 'puaw', 'puah', 'puahh',
    'puan', 'puanw', 'puanx', 'puanz', 'puann', 'puanny', 'puannw', 'puannx',
    'puannz', 'puat', 'puatt', 'pue', 'puey', 'puew', 'puex', 'puez', 'pueh',
    'puehh', 'puh', 'pui', 'puix', 'puiz', 'pun', 'puny', 'punw', 'punx',
    'punz', 'put', 'putt',

    'pha', 'phaw', 'phaz', 'phah', 'phaiw', 'phainny', 'phainnz', 'phak',
    'phakk', 'phan', 'phanz', 'phang', 'phangy', 'phangw', 'phangx', 'phangz',
    'phannw', 'phannz', 'phau', 'phauy', 'phauw', 'phauz', 'phauhh', 'phe',
    'phey', 'phew', 'phez', 'phenn', 'phennx', 'phennz', 'phi', 'phiy', 'phiw',
    'phix', 'phiz', 'phiah', 'phiahh', 'phiak', 'phiakk', 'phien', 'phienw',
    'phienx', 'phiang', 'phiangz', 'phiann', 'phianny', 'phiannx', 'phiet',
    'phiau', 'phiauw', 'phiaux', 'phih', 'phihh', 'phik', 'phiny', 'phinx',
    'phinz', 'phing', 'phingw', 'phingx', 'phingz', 'phinn', 'phinnw', 'phinnx',
    'phinnz', 'phiurw', 'phiurx', 'phit', 'phngh', 'phur', 'phury', 'phurw',
    'phurz', 'phurh', 'phok', 'phokk', 'phong', 'phongy', 'phongw', 'phongx',
    'phongz', 'pho', 'phoy', 'phow', 'phox', 'phoz', 'phuy', 'phux', 'phuz',
    'phuaw', 'phuah', 'phuahh', 'phuan', 'phuanx', 'phuanz', 'phuann',
    'phuannw', 'phuannz', 'phuat', 'phue', 'phuey', 'phuew', 'phuex', 'phuez',
    'phuehh', 'phuhh', 'phuiy', 'phuiw', 'phun', 'phuny', 'phunw', 'phunx',
    'phut', 'phutt',

    'sa', 'say', 'saw', 'sah', 'sahh', 'sai', 'saiy', 'saiw', 'saix', 'saiz',
    'sak', 'sam', 'samy', 'samw', 'samx', 'san', 'sany', 'sanw', 'sang',
    'sangy', 'sangw', 'sann', 'sannh', 'sap', 'sat', 'sau', 'sauw', 'se', 'sey',
    'sew', 'sex', 'seh', 'sehh', 'senn', 'senny', 'sennw', 'si', 'siy', 'siw',
    'six', 'siz', 'sia', 'siay', 'siaw', 'siax', 'siaz', 'siah', 'siahh',
    'siak', 'siam', 'siamy', 'siamw', 'siamx', 'sien', 'sieny', 'sienw',
    'sienx', 'sienz', 'siang', 'siangy', 'siangw', 'siangx', 'siangz', 'siann',
    'sianny', 'siannw', 'siannx', 'siannz', 'siap', 'siapp', 'siet', 'siett',
    'siau', 'siauy', 'siauw', 'siaux', 'siauz', 'sih', 'sihh', 'sik', 'sikk',
    'sim', 'simy', 'simw', 'simx', 'simz', 'sin', 'sinw', 'sinx', 'sinz',
    'sing', 'singy', 'singw', 'singx', 'singz', 'sinn', 'sinnw', 'sinnz',
    'siur', 'siury', 'siurx', 'siurh', 'siurhh', 'siok', 'siokk', 'siong',
    'siongy', 'siongw', 'siongx', 'siongz', 'sip', 'sipp', 'sit', 'sitt', 'siu',
    'siuy', 'siuw', 'siux', 'siuz', 'siunn', 'siunny', 'siunnw', 'siunnx',
    'siunnz', 'sng', 'sngy', 'sngw', 'sngx', 'sngh', 'sur', 'sury', 'surw',
    'surx', 'surz', 'surh', 'sok', 'som', 'song', 'songy', 'songw', 'songx',
    'so', 'soy', 'sow', 'su', 'suy', 'suw', 'sux', 'suz', 'sua', 'suay', 'suaw',
    'suah', 'suai', 'suainnz', 'suan', 'suany', 'suanw', 'suanx', 'suanz',
    'suann', 'suanny', 'suannw', 'suat', 'sue', 'suey', 'suew', 'suex', 'sueh',
    'suh', 'sui', 'suiy', 'suiw', 'suix', 'suiz', 'sun', 'suny', 'sunw', 'sunx',
    'sunz', 'sut', 'sutt',

    'ta', 'tay', 'taw', 'tah', 'tahh', 'tai', 'taiy', 'taiw', 'taix', 'taiz',
    'tainn', 'tainny', 'tak', 'takk', 'tam', 'tamy', 'tamw', 'tamx', 'tamz',
    'tan', 'tany', 'tanw', 'tanx', 'tanz', 'tang', 'tangy', 'tangw', 'tangx',
    'tangz', 'tann', 'tanny', 'tannw', 'tannx', 'tannz', 'tap', 'tapp', 'tat',
    'tatt', 'tau', 'tauy', 'tauw', 'taux', 'tauz', 'tauh', 'tauhh', 'te', 'tey',
    'tew', 'tex', 'tez', 'teh', 'tenn', 'tennw', 'tennz', 'ti', 'tiy', 'tiw',
    'tix', 'tiz', 'tia', 'tiah', 'tiahh', 'tiak', 'tiakk', 'tiam', 'tiamy',
    'tiamw', 'tiamx', 'tiamz', 'tien', 'tieny', 'tienx', 'tienz', 'tianny',
    'tiannx', 'tiannz', 'tiap', 'tiapp', 'tiet', 'tiett', 'tiau', 'tiauw',
    'tiaux', 'tiauz', 'tih', 'tihh', 'tik', 'tikk', 'timw', 'timx', 'timz',
    'tin', 'tiny', 'tinw', 'tinx', 'tinz', 'ting', 'tingy', 'tingw', 'tingx',
    'tingz', 'tinn', 'tinnx', 'tinnz', 'tinnhh', 'tiurw', 'tiurx', 'tiurz',
    'tiurh', 'tiurhh', 'tiok', 'tiokk', 'tiong', 'tiongy', 'tiongw', 'tiongx',
    'tiongz', 'tit', 'titt', 'tiu', 'tiuy', 'tiuw', 'tiux', 'tiuz', 'tiuh',
    'tiunn', 'tiunny', 'tiunnw', 'tiunnx', 'tiunnz', 'tng', 'tngy', 'tngw',
    'tngx', 'tngz', 'tur', 'tury', 'turw', 'turx', 'turz', 'turh', 'turhh',
    'tok', 'tokk', 'tomx', 'tong', 'tongy', 'tongw', 'tongx', 'tongz', 'to',
    'toy', 'tow', 'tox', 'toz', 'tu', 'tuy', 'tuw', 'tux', 'tuz', 'tuaw',
    'tuaz', 'tuan', 'tuany', 'tuanw', 'tuanz', 'tuann', 'tuannw', 'tuannx',
    'tuannz', 'tuat', 'tuatt', 'tuew', 'tuex', 'tuez', 'tuh', 'tuhh', 'tui',
    'tuiw', 'tuix', 'tuiz', 'tun', 'tuny', 'tunw', 'tunz', 'tutt', 

    'thaw', 'thah', 'thahh', 'thai', 'thaiy', 'thaiw', 'thaix', 'thaiz', 'thak',
    'thakk', 'tham', 'thamw', 'thamx', 'thamz', 'than', 'thany', 'thanw',
    'thanx', 'thang', 'thangy', 'thangw', 'thangx', 'thann', 'thanny', 'thap',
    'that', 'thau', 'thauy', 'thauw', 'thaux', 'thauz', 'the', 'they', 'thew',
    'thex', 'thez', 'theh', 'thehh', 'thennw', 'thennx', 'thi', 'thiy', 'thiw',
    'thix', 'thiz', 'thiah', 'thiam', 'thiamy', 'thiamz', 'thien', 'thieny',
    'thiann', 'thiannw', 'thiannx', 'thiannz', 'thiap', 'thiapp', 'thiet',
    'thiau', 'thiauy', 'thiauw', 'thiaux', 'thiauz', 'thih', 'thihh', 'thik',
    'thikk', 'thim', 'thin', 'thinx', 'thinz', 'thing', 'thingy', 'thingw',
    'thingx', 'thinn', 'thinnz', 'thiur', 'thiurw', 'thiurx', 'thiok', 'thiong',
    'thiongy', 'thiongw', 'thiongx', 'thiu', 'thiuy', 'thng', 'thngw', 'thngx',
    'thngz', 'thur', 'thury', 'thurw', 'thurx', 'thurh', 'thurhh', 'thok',
    'thokk', 'thong', 'thongy', 'thongw', 'thongz', 'thoy', 'thow', 'thox',
    'thuy', 'thua', 'thuaz', 'thuah', 'thuanx', 'thuann', 'thuanny', 'thuannw',
    'thuat', 'thuh', 'thui', 'thuiy', 'thuiw', 'thuix', 'thun', 'thuny', 
    'thunx', 'thunz', 'thut', 'thutt',

    'u', 'uy', 'uw', 'ux', 'uz', 'uh', 'ua', 'uay', 'uax', 'uahh', 'uai',
    'uainny', 'uan', 'uany', 'uanw', 'uanx', 'uanz', 'uang', 'uann', 'uanny',
    'uannw', 'uannz', 'uat', 'uatt', 'ue', 'uey', 'uew', 'uex', 'uez', 'ueh',
    'ui', 'uiy', 'uiw', 'uix', 'uiz', 'un', 'uny', 'unw', 'unx', 'unz', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urhh',
]
