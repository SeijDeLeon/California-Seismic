
  const data = [
    {
      title: 'Seismic Data and Seismic Design Criteria',
      questions: [
        {key:'a1',
        description:'Determine Site Class #1',
        question:"For Site Class A, which methods are used to determine the site Class?",
        false1:'Average field standard penetration resistance test  and, average standard penetration resistance test for cohesionless soil layers',
        false2:'Average undrained shear strength',
        false3: 'Any of the three methods',
        answer:'Average shear wave velocity',
        solution:"ASCE 7-16 chapter 20.3.5 <br> The hard rock, Site Class A, category shall be supported by the shear wave velocity measurement either on site or on profiles of the same rock type in the same formation with an equal or higher degree of weathering and fracturing.",
        imgQ:"a1Q.png",
        imgS:"a1S.png",
        lectures:'2',
        difficulty:'easy'},
        {key:'a2',
        description:'Determine Site Class #2',
        question:"If a site profile contains a 10ft thick layer of very moist soil (moisture content = 50%) in the upper 100ft, and the result for the average shear wave velocity is 800 ft/s. What is the appropriate site class?",
        false1:'F',
        false2:'C',
        false3: 'D',
        answer:'E',
        solution:"ASCE 7-16 Table 20.3-1 <br> Any soil profile with more than 10 ft of soil with a moisture content ≥ 40% should be classified as class E.",
        imgQ:"a2Q.png",
        imgS:"a2S.png",
        lectures:'2',
        difficulty:'easy'},
        {key:'a3',
        description:'Site Coefficients #1',
        question:"For a Site Class B with no site-specific velocity measurements, what should be the considered values for the site coefficients Fa and Fv?",
        false1:'0.75',
        false2:'1.25',
        false3: '0',
        answer:'1',
        solution:"ASCE 7-16 chapter 11.4.3 <br> For conditions consistent with Site Class B, but site-specific velocity measurements are not made, the site coefficients F\\(_{a}\\), F\\(_{v}\\), and F\\(_{pga}\\) shall be taken as unity (1.0).",
        imgQ:"a3Q.png",
        imgS:"a3S.png",
        lectures:'1, 3, 8',
        difficulty:'easy'},
        {key:'a4',
        description:'Importance Factor #1',
        question:"What is the seismic importance factor for a veterinary clinic that performs surgeries on animals?",
        false1:'Not enough information available',
        false2:'1.0',
        false3: '1.25',
        answer:'1.5',
        solution:"Per ASCE 7-16 Table 1.5-1, there is no specific category for animal hospitals or veterinary clinics. Therefore the default category would be Risk Category 2. Per Table 1.5-2 a Risk Category 2 structure has a seismic importance factor of 1.0. An importyance factor of 1.5 would be applicable if it was a medical facility that provided surgery on human patients.",
        imgQ:"a4Q.png",
        imgS:"a4S.png",
        lectures:'5',
        difficulty:'easy'},
        {key:'a5',
        description:'Seismic Design Category #1',
        question:"What is the Seismic Design Category of a single story residential home if S\\(_{s}\\)=0.75 and the average field standard penetration result is 75 blows/ft?",
        false1:'A',
        false2:'B',
        false3: 'C',
        answer:'D',
        solution:"Using Table 20.30-1 with 75 blows/ft corresponds to Site Class C. <br> Fa = 1.2 per Table 11.4-1 <br> SMS = FaSs (EQ 11.4-1) <br> SMS = (1.2)(0.75) = 0.9 <br> SDS=2/3SMS (EQ 11.4-1) <br> SDS=2/3(0.9) = 0.6 <br> Residential Home is Risk Category II per Table 1.5-1 <br> With these inputs, reading Table 11.6-1 the Seismic Design Category is D",
        imgQ:"a5Q.png",
        imgS:"a5S.png",
        lectures:'5',
        difficulty:'medium'},
        {key:'a6',
        description:'Seismic Design Category #2',
        question:"What is the SDC of a Nuclear Power plant with an SD1 of 0.15? Assume S1 < 0.75.",
        false1:'A',
        false2:'B',
        false3: 'C',
        answer:'D',
        solution:"Using Table 1.5-1, a Nuclear Power Plant has a Risk Category IV <br> Per Table 11.6-2, A RC IV and SD1 in between 0.13 3 and 0.20 shall be type D. <br> Note that if we were provided an S1 value exceeding 0.75, per the description in 11.6 the SDC for a RC IV structure with S1 > 0.75 would be type F.",
        imgQ:"a6Q.png",
        imgS:"a6S.png",
        lectures:'5',
        difficulty:'easy'},
        {key:'a7',
        description:'Exceptions #1',
        question:"How can a structure on Site Class E with Ss = 1.2 be designed without the need of a ground motion hazard analysis?",
        false1:'The proposed structure requires a ground motion hazard analysis.',
        false2:'Use a T greater than Ts.',
        false3: 'Double the short period design acceleration parameter.',
        answer:'Determine short period acceleration parameters assuming site class C.',
        solution:"Exception #1 of section 11.4.8 states that a ground motion hazard analysis is not required for the structure type if the site coefficient Fa is taken as equal to that of site class C. <br> It is also acceptable to forego a ground motion hazard analysis for the proposed structure if T < Ts per exception #3.",
        imgQ:"a7Q.png",
        imgS:"a7S.png",
        lectures:'5',
        difficulty:'easy'},
        {key:'a8',
        description:'Importance Factor #2',
        question:"Importance factor is related to all of the followinge except:",
        false1:'The degree of risk to human life if the structure fails',
        false2:'The type of structure occupancy or use',
        false3: 'Risk Category',
        answer:'The time to repair the structure after it is damaged',
        solution:"Importance Factors are determined in Table 1.5-2, and are based on Risk Category. Risk Category is influenced by the degree of risk to human life if the structure fails, and also the type of structure occupancy. <br> The only factor listed that does not directly influence Importance Factor is the time to repair the structure. Performance Based Design can be used to set building requirements based on repair times, however this is not a part of determining Importance Factors.",
        imgQ:"a8Q.png",
        imgS:"a8S.png",
        lectures:'2',
        difficulty:'easy'},
      ]
    },
    {
      title: 'Seismic Characteristics of Engineered Systems',
      questions: [
        {key:'b1',
        description:'Irregularity #1',
        question:"Which vertical irregularity is present in the following building structure?",
        false1:'Stiffness-Soft Story Irregularity',
        false2:'Vertical Geometric Irregularity',
        false3: 'In-Plance Discontinuity',
        answer:'Weight Irregularity',
        solution:"Per Table 12.3-2, type 2: Weight Irregularity <br> Any non-roof level that is more than 150% of an adjacent level is considered to have a mass irregularity. <br> Since W3 is more than 150% of W2, this condition is met. <br> Note that W4 is a roof level, so it does not trigger the irregularity. ",
        imgQ:"b1Q.png",
        imgS:"b1S.png",
        lectures:'3',
        difficulty:'easy'}
      ]
    },
    {
      title: 'Seismic Analysis Procedures',
      questions: [
        {key:'e1',
        description:'Analysis Procedure #1',
        question:"Which of the following procedures is not allowed for a 170' tall steel moment frame building in Seismic Design Category D with a fundamental building period of 4 seconds?",
        false1:'Modal Response Spectrum Analysis',
        false2:'Nonlinear Response History Procedures',
        false3: 'All procedures are allowed',
        answer:'Equivalent Lateral Force Procedure',
        solution:"Reference ASCE 7-16 Table 12.6-1 Permitted Analytical Procedures. The described structure would fall under the “All Other Structures” category because it does not fit into any of the structural characteristics for SDC D.",
        imgQ:"e1Q.png",
        imgS:"e1S.png",
        lectures:'3',
        difficulty:'easy'},
        {key:'e2',
        description:'Max building height #1',
        question:"What is the structure height limitation for a building reinforced with steel special truss moment frames and a Seismic Design Category E?",
        false1:'160 ft',
        false2:'No Limit',
        false3: 'Not Permitted',
        answer:'100 ft',
        solution:"ASCE 7-16 Table 12.2-1 <br> Design Coefficients and Factors for Seismic Force-Resisting Systems Structural System Limitations Including Structural Height <br> h\\(_{n}\\) (ft) \\(Limits^{d}\\)",
        imgQ:"e2Q.png",
        imgS:"e2S.png",
        lectures:'1, 3, 8',
        difficulty:'easy'},
        {key:'e3',
        description:'Analysis Procedure #2',
        question:"Determine the rigidity of a concrete-filled metal deck diaphragm with a span to depth ratio of 2 in a structure with no irregularities. The deflection of the diaphragm is 2 inches and the drift is equal to 1.5 inches.",
        false1:'More information is required to determine rigidity',
        false2:'Flexible',
        false3: 'Semi-Rigid',
        answer:'Rigid',
        solution:"ASCE 7-16 section 12.3.1.2 Rigid Diaphragm Condition. <br> Diaphragms of concrete slabs or concrete-filled metal deck with span-to-depth ratios of 3 or less in structures that have no horizontal irregularities are permitted to be idealized as rigid.",
        imgQ:"e3Q.png",
        imgS:"e3S.png",
        lectures:'12',
        difficulty:'easy'},
      ]
    }
  ];


module.exports = {data};