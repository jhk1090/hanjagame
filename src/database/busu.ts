export interface IData {
    form: string[];
    sound: string[];
    define?: string;
}

export interface IDict {
  name: string;
  description: string;
  content: Record<string, IData[]>;
  edit: "disallow" | "password" | "allow";
  password?: string;
}


export const busu: IDict = {
  name: "부수",
  description: "강희자전 방식의 부수 214자를 모아두었습니다.",
  edit: "disallow",
  content: {
    "1획": [
      { form: ["一"], sound: ["한 일"] },
  
      { form: ["丨"], sound: ["뚫을 곤"] },
  
      { form: ["丶"], sound: ["점주"] },
  
      { form: ["丿"], sound: ["삐침 별"] },
  
      { form: ["乙", "⺃"], sound: ["새 을"] },
  
      { form: ["亅"], sound: ["갈고리 궐"] },
    ],
    "2획": [
      { form: ["二"], sound: ["두 이"] },
  
      { form: ["亠"], sound: ["돼지해머리 두"], define: "돼지해 머리: 돼지 해(亥) 자의 머리." },
  
      { form: ["人", "亻"], sound: ["사람 인", "사람인변"] },
  
      { form: ["儿"], sound: ["어진사람 인"] },
  
      { form: ["⼊"], sound: ["들 입"] },
  
      { form: ["⼋"], sound: ["여덟 팔"] },
  
      { form: ["⼌"], sound: ["멀 경"] },
  
      { form: ["⼍"], sound: ["덮을 멱", "민갓머리"], define: "민갓머리: 갓머리(宀)에서 위에 점이 없다는 뜻." },
  
      { form: ["⼎"], sound: ["얼음 빙", "이수변"], define: "이수 변: 물 수(水)는 셋인데 두 개라는 뜻." },
  
      { form: ["⼏"], sound: ["안석 궤"], define: "안석: 앉는 의자" },
  
      { form: ["⼐"], sound: ["입벌릴 감", "위튼입구"], define: "위튼입구: 입 구(口)에서 위가 터있다는 뜻." },
  
      { form: ["⼑", "刂"], sound: ["칼 도", "선칼도방"] },
  
      { form: ["力"], sound: ["힘 력"] },
  
      { form: ["勹"], sound: ["쌀 포"] },
  
      { form: ["⼔"], sound: ["비수 비", "술 비"] },
  
      { form: ["⼕"], sound: ["상자 방", "튼입구"], define: "튼입구: 입 구(口)에서 옆이 터있다는 것." },
  
      { form: ["匸"], sound: ["감출 혜"] },
  
      { form: ["⼗"], sound: ["열 십"] },
  
      { form: ["⼘"], sound: ["점 복"] },
  
      { form: ["⼙", "㔾"], sound: ["병부 절"], define: "병부: 자루가 긴 굽은 칼." },
  
      { form: ["⼚"], sound: ["언덕 한", "민엄호"], define: "민엄호(밑): 엄호(广)에서 위에 점이 없다는 말." },
  
      { form: ["⼛"], sound: ["사사로울 사", "마늘모"], define: "마늘모: 삼각 모양의 옛 말." },
  
      { form: ["⼜"], sound: ["또 우"] },
    ],
    "3획": [
      { form: ["⼝"], sound: ["입 구"] },
  
      { form: ["⼞"], sound: ["에울 위", "큰입구몸"] },
  
      { form: ["⼟"], sound: ["흙 토"] },
  
      { form: ["⼠"], sound: ["선비 사"] },
  
      { form: ["⼡"], sound: ["뒤져올 치"], define: "뒤져올(뒤쳐올): 뒤에 처져서 온다는 말." },
  
      { form: ["⼢"], sound: ["천천히걸을 쇠"], define: "뚜벅뚜벅 걷는 소의 발." },
  
      { form: ["⼣"], sound: ["저녁 석"] },
  
      { form: ["⼤"], sound: ["큰 대"] },
  
      { form: ["⼥"], sound: ["계집 녀"] },
  
      { form: ["⼦"], sound: ["아들 자"] },
  
      { form: ["⼧"], sound: ["집 면", "갓머리"] },
  
      { form: ["⼨"], sound: ["마디 촌"] },
  
      { form: ["⼩"], sound: ["작을 소"] },
  
      { form: ["尢", "兀", "尣"], sound: ["절름발이 왕"] },
  
      { form: ["⼫"], sound: ["주검 시"] },
  
      { form: ["屮"], sound: ["싹날 철"] },
  
      { form: ["⼭"], sound: ["뫼 산"], define: "뫼(메): 산의 옛 말." },
  
      { form: ["川", "⼮"], sound: ["내 천", "개미허리"] },
  
      { form: ["⼯"], sound: ["장인 공"] },
  
      { form: ["⼰"], sound: ["몸 기"] },
  
      { form: ["⼱"], sound: ["수건 건"] },
  
      { form: ["⼲"], sound: ["방패 간"] },
  
      { form: ["⼳"], sound: ["작을 요"] },
  
      { form: ["⼴"], sound: ["집 엄", "엄호"], define: "엄호: 지붕이 한쪽으로 늘어뜨려진 것." },
  
      { form: ["⼵"], sound: ["끌 인", "길게걸을 인", "민책받침"], define: "민책받침: 책받침(辶)에서 위에 점이 없다는 뜻." },
  
      { form: ["⼶"], sound: ["바칠 공", "밑스물입"], define: "밑스물입(스물입발): 십(十)이 둘로 스물이며 발이 있다는 뜻." },
  
      { form: ["⼷"], sound: ["주살 익"], define: "주살: 활쏘기 연습할 때 화살에 줄을 매달고 쏘는데 그 줄." },
  
      { form: ["⼸"], sound: ["활 궁"] },
  
      { form: ["⼹", "彑"], sound: ["돼지머리 계", "튼가로왈"], define: "튼가로왈: 가로 왈(曰)에서 한 쪽이 텄다는 말." },
  
      { form: ["⼺"], sound: ["터럭 삼", "삐친석삼"] },
  
      { form: ["⼻"], sound: ["자축거릴 척", "두인변"], define: "두인변: 亻변에서 또 하나의 점이 있다는 말." },
    ],
    "4획": [
      { form: ["⼼", "忄", "㣺"], sound: ["마음 심", "심방변", "밑마음심"] },
  
      { form: ["⼽"], sound: ["창 과"] },
  
      { form: ["⼾"], sound: ["지게 호"], define: "지게: 외짝 문이 있는 안방을 지게라 함." },
  
      { form: ["⼿", "扌"], sound: ["손 수", "손수변", "재방변"] },
  
      { form: ["⽀"], sound: ["가를 지", "지탱할 지"] },
  
      { form: ["⽁", "攵"], sound: ["칠 복", "등글월문"], define: "등글: 좋거나 감탄하며 작게 무릎을 치는 것." },
  
      { form: ["⽂"], sound: ["무늬 문", "글월 문"], define: "글월: 옛날에는 글을 소중히 생각하여 글월이라 했음." },
  
      { form: ["⽃"], sound: ["말 두"] },
  
      { form: ["⽄"], sound: ["도끼 근", "날근방"], define: "날: 무게를 다는 저울의 옛 말." },
  
      { form: ["⽅"], sound: ["모 방"] },
  
      { form: ["⽆"], sound: ["없을 무", "이미기방"] },
  
      { form: ["⽇"], sound: ["날 일"] },
  
      { form: ["⽈"], sound: ["가로 왈"] },
  
      { form: ["⽉"], sound: ["달 월"] },
  
      { form: ["⽊"], sound: ["나무 목"] },
  
      { form: ["⽋"], sound: ["하품 흠"] },
  
      { form: ["⽌"], sound: ["그칠 지"] },
  
      { form: ["⽍", "歺"], sound: ["부서진뼈 알", "죽을사변"] },
  
      { form: ["⽎"], sound: ["창 수", "갖은등글월문"], define: "갖은등글월문: 등글월 문(攴)에 보탰다는 것." },
  
      { form: ["⽏"], sound: ["말 무"], define: "말: 하지 말라는 뜻." },
  
      { form: ["⽐"], sound: ["견줄 비"] },
  
      { form: ["⽑"], sound: ["터럭 모"] },
  
      { form: ["⽒"], sound: ["각시 씨", "성 씨"], define: "각시: 새색시" },
  
      { form: ["⽓"], sound: ["기운 기"] },
  
      { form: ["⽔", "氵", "氺"], sound: ["물 수", "삼수변", "아래물수"] },
  
      { form: ["⽕", "灬"], sound: ["불 화", "불화발"] },
  
      { form: ["⽖", "爫"], sound: ["손톱 조", "손톱머리"] },
  
      { form: ["⽗"], sound: ["아비 부"] },
  
      { form: ["⽘"], sound: ["효 효", "점괘 효"] },
  
      { form: ["⽙"], sound: ["나무조각 장", "장수장변"], define: "장수장변: 장수 장(將)에서 딴 변." },
  
      { form: ["⽚"], sound: ["조각 편"] },
  
      { form: ["⽛"], sound: ["어금니 아"] },
  
      { form: ["⽜", "牜"], sound: ["소 우", "소우변"] },
  
      { form: ["⽝", "犭"], sound: ["개 견", "개사슴록변"] },
    ],
    "5획": [
      { form: ["⽞"], sound: ["검을 현"] },
  
      { form: ["⽟", "⺩"], sound: ["구슬 옥", "구슬옥변"] },
  
      { form: ["⽠"], sound: ["오이 과"] },
  
      { form: ["⽡"], sound: ["기와 와"] },
  
      { form: ["⽢"], sound: ["달 감"] },
  
      { form: ["⽣"], sound: ["날 생"] },
  
      { form: ["⽤"], sound: ["쓸 용"] },
  
      { form: ["⽥"], sound: ["밭 전"] },
  
      { form: ["⽦", "⺪"], sound: ["발 소", "짝 필"], define: "짝: 짐승을 헤아릴 때 쓰는 단위." },
  
      { form: ["⽧"], sound: ["병들어기댈 녁", "병질엄"], define: "병질엄: 병 질(疾)에서 딴 엄호." },
  
      { form: ["⽨"], sound: ["걸을 발", "필발머리"], define: "필발머리: 필 발(發)의 머리." },
  
      { form: ["⽩"], sound: ["흰 백"] },
  
      { form: ["⽪"], sound: ["가죽 피"] },
  
      { form: ["⽫"], sound: ["그릇 명"] },
  
      { form: ["⽬"], sound: ["눈 목"] },
  
      { form: ["⽭"], sound: ["창 모"] },
  
      { form: ["⽮"], sound: ["화살 시"] },
  
      { form: ["⽯"], sound: ["돌 석"] },
  
      { form: ["⽰", "礻"], sound: ["보일 시", "제기"] },
  
      { form: ["⽱"], sound: ["짐승발자국 유"] },
  
      { form: ["⽲"], sound: ["벼 화"] },
  
      { form: ["⽳"], sound: ["구멍 혈", "굴 혈"] },
  
      { form: ["⽴"], sound: ["설 립"] },
    ],
    "6획": [
      { form: ["⽵", "⺮"], sound: ["대 죽"] },
  
      { form: ["⽶"], sound: ["쌀 미"] },
  
      { form: ["⽷"], sound: ["실 사", "가는실 멱"] },
  
      { form: ["⽸"], sound: ["장군 부"], define: "장군: 통은 크고 목이 좁은 옛날 거름을 담아 나르던 그릇." },
  
      { form: ["⽹", "罒", "䍏"], sound: ["그물 망"] },
  
      { form: ["⽺"], sound: ["양 양 "] },
  
      { form: ["⽻"], sound: ["깃 우"] },
  
      { form: ["⽼"], sound: ["늙을 로"] },
  
      { form: ["⽽"], sound: ["말이을 이"] },
  
      { form: ["⽾"], sound: ["쟁기 뢰"] },
  
      { form: ["⽿"], sound: ["귀 이"] },
  
      { form: ["⾀"], sound: ["붓 율"] },
  
      { form: ["⾁", "⽉"], sound: ["고기 육", "육달월"] },
  
      { form: ["⾂"], sound: ["신하 신"] },
  
      { form: ["⾃"], sound: ["스스로 자"] },
  
      { form: ["⾄"], sound: ["이를 지"] },
  
      { form: ["臼"], sound: ["절구 구"] },
  
      { form: ["⾆"], sound: ["혀 설"] },
  
      { form: ["⾇"], sound: ["어그러질 천"] },
  
      { form: ["⾈"], sound: ["배 주"] },
  
      { form: ["⾉"], sound: ["어긋날 간", "그칠 간"] },
  
      { form: ["⾊"], sound: ["빛 색"] },
  
      { form: ["⾋", "艹"], sound: ["풀 초", "초두머리"] },
  
      { form: ["⾌"], sound: ["호파무늬 호", "범호엄"] },
  
      { form: ["⾍"], sound: ["벌레 충", "벌레 훼", "살무사"] },
  
      { form: ["⾎"], sound: ["피 혈"] },
  
      { form: ["⾏"], sound: ["갈 행"] },
  
      { form: ["⾐", "衤"], sound: ["옷 의", "옷의변"] },
  
      { form: ["襾", "覀"], sound: ["덮을 아"] },
    ],
    "7획": [
      { form: ["⾒"], sound: ["볼 견"] },
  
      { form: ["⾓"], sound: ["뿔 각"] },
  
      { form: ["⾔"], sound: ["말씀 언"] },
  
      { form: ["⾕"], sound: ["골 곡"] },
  
      { form: ["⾖"], sound: ["콩 두", "제기이름"] },
  
      { form: ["⾗"], sound: ["돼지 시"] },
  
      { form: ["⾘"], sound: ["빌없는벌레 치", "해태 치", "갖은돼지 시"], define: "갖은돼지 시: 돼지 시(⾗)에 더욱 갖춘 것을 말함." },
  
      { form: ["⾙"], sound: ["조개 패"] },
  
      { form: ["⾚"], sound: ["붉을 적"] },
  
      { form: ["⾛"], sound: ["달릴 주"] },
  
      { form: ["⾜"], sound: ["발 족"] },
  
      { form: ["⾝"], sound: ["몸 신"] },
  
      { form: ["⾞"], sound: ["수레 거", "수레 차"] },
  
      { form: ["⾟"], sound: ["매울 신"] },
  
      { form: ["⾠"], sound: ["별 진", "별 신"] },
  
      { form: ["⾡", "辶"], sound: ["쉬엄쉬엄갈 착", "책받침"], define: "책받침: 변과 받침을 겸한 모양." },
  
      { form: ["⾢", "⻏"], sound: ["고을 읍", "우부방"] },
  
      { form: ["⾣"], sound: ["술 유", "닭 유"] },
  
      { form: ["⾤"], sound: ["분별할 변"] },
  
      { form: ["⾥"], sound: ["마을 리"] },
    ],
    "8획": [
      { form: ["⾦"], sound: ["쇠 금"] },
  
      { form: ["⾧"], sound: ["길 장"] },
  
      { form: ["⾨"], sound: ["문 문"] },
  
      { form: ["⾩", "阝"], sound: ["언덕 부", "좌부방변"] },
  
      { form: ["⾪"], sound: ["미칠 이"] },
  
      { form: ["⾫"], sound: ["새 추"] },
  
      { form: ["⾬"], sound: ["비 우"] },
  
      { form: ["⾭"], sound: ["푸를 청"] },
  
      { form: ["⾮"], sound: ["아닐 비"] },
    ],
    "9획": [
      { form: ["⾯"], sound: ["낯 면"] },
  
      { form: ["⾰"], sound: ["가죽 혁"] },
  
      { form: ["⾱"], sound: ["다룸가죽 위", "무두질한", "가죽 위"] },
  
      { form: ["⾲"], sound: ["부추 구"] },
  
      { form: ["⾳"], sound: ["소리 음"] },
  
      { form: ["⾴"], sound: ["머리 혈"] },
  
      { form: ["⾵"], sound: ["바람 풍"] },
  
      { form: ["⾶"], sound: ["날 비"] },
  
      { form: ["⾷", "⻞", "⻟"], sound: ["밥 식", "밥식변"] },
  
      { form: ["⾸"], sound: ["머리 수"] },
  
      { form: ["⾹"], sound: ["향기 향"] },
    ],
    "10획": [
      { form: ["⾺"], sound: ["말 마"] },
  
      { form: ["⾻"], sound: ["뼈 골"] },
  
      { form: ["⾼"], sound: ["높을 고"] },
  
      { form: ["⾽"], sound: ["터럭발", "긴털드리울 표"] },
  
      { form: ["⾾"], sound: ["싸울 투"], define: "鬪에서 가져온 것." },
  
      { form: ["⾿"], sound: ["울창주 창"], define: "울창주(鬱鬯酒): 제사를 위하여 특별히 담가놓은 술." },
  
      { form: ["⿀"], sound: ["다리굽은솥 력"] },
  
      { form: ["⿁"], sound: ["귀신 귀"] },
    ],
    "11획": [
      { form: ["⿂"], sound: ["물고기 어"] },
  
      { form: ["⿃"], sound: ["새 조"] },
  
      { form: ["⿄"], sound: ["소금밭 로"] },
  
      { form: ["⿅"], sound: ["사름 록"] },
  
      { form: ["⿆"], sound: ["보리 맥"] },
  
      { form: ["⿇"], sound: ["삼 마"] },
    ],
    "12획": [
      { form: ["⿈"], sound: ["누를 황"] },
  
      { form: ["⿉"], sound: ["기장 서"] },
  
      { form: ["⿊"], sound: ["검을 흑"] },
  
      { form: ["⿋"], sound: ["바느질 치"] },
    ],
    "13획": [
      { form: ["⿌"], sound: ["맹꽁이 맹"] },
  
      { form: ["⿍"], sound: ["솥 정"] },
  
      { form: ["⿎"], sound: ["북 고"] },
  
      { form: ["鼠"], sound: ["쥐 서"] },
    ],
    "14획": [
      { form: ["鼻"], sound: ["코 비"] },
  
      { form: ["⿑"], sound: ["가지런할 제"] },
    ],
    "15획": [{ form: ["⿒"], sound: ["이 치"] }],
    "16획": [
      { form: ["⿓"], sound: ["용 룡"] },
  
      { form: ["龜"], sound: ["거북 귀"] },
    ],
    "17획": [{ form: ["龠"], sound: ["피리 약"] }],
  }
}