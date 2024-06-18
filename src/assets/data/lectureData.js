const lectureData = [
  {
    title: '01: Intro to Seismic Exam',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vTCoo5R3ujLPCx-fGyiV8gpGRDKGBgnX7OPOwH4UKyGBUPePJp-uNvq6sw6vJXL9v2S9j89FZH0CZBi/pub?embedded=true',
    references:[['https://www.bpelsg.ca.gov/applicants/candidate_info.shtml','Exam Website'],['https://www.asce.org/publications-and-news/asce-7','ASCE 7'],['https://codes.iccsafe.org/content/CABC2022P1','CBC']],
    summary:'This lecture is an overview of the California Seismic Principles Exam. The basics of where the exam sits on the path to earning a PE license, and its requirements will be explained. Nothing in this lecture will be on the exam',
    prereqs:['none'],
    objectives:['Exam requirements and general information'],
    video:'https://www.youtube.com/embed/yjVDpxXzc5M',
    text: 'An overview of the Seismic Exam and its requirements. No structural content here, just background info on the exam itself and what to expect the day of.',
    minutes: 30,
    pages: 10,
    problems: 0,
    difficulty: 0,
    img: '/images/lectures/01_Intro.png',
    href: "01"
  },

  {
    title: '02: Geology & Earthquakes',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vTgK-Wt0tdhKtZHpgY7Vl9qmvFnYJvq8QRpkGKhwJ8WvoHJ5UXdc-aRx0ABaoZ-Kl174yqejes51PYS/pub?embedded=true',
    references:[],
    summary:'How do earthquakes occur, and how does historical data make its way into the building code? The basics of seismology are discussed in this lecture, with a key emphasis on the modern building code.',
    prereqs:['none'],
    objectives:['Different types of seismic waves', 'The difference between different magnitudes', 'How ground motions can be used to develop spectral accelerations', 'How the building code approaches sets limits on seismic risk'],
    video:'https://www.youtube.com/embed/lUUr4ILz57w',
    text: 'General background information on tectonic activity and how eathquakes happen. A good starting point for understanding the hazards associated with seismic events and how it leads to building code requirements.',
    minutes: 60,
    pages: 10,
    problems: 0,
    difficulty: 0,
    img: '/images/lectures/02_Geology.png',
    href: "02"
  },

  {
    title: '03: Code Provisions',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vTPD1IDa1z8BDbZwxCdZctVGOjdkFaDtSkaCAjuONNihWFK-R9jfeYD7WaHWSmN3WXiZDmOCs9CKgKQ/pub?embedded=true',
    references:['https://www.asce.org/publications-and-news/asce-7'],
    summary:'Building codes and reference standards are the basis for ensuring that structures are designed to a minimum standard. This lecture provides a brief history and overview of building codes to illustrate how ASCE 7 is related to the overall permitting process.',
    prereqs:['none'],
    objectives:['The origin of the building code', 'How design standards are enforced', 'The risk of collapse for building structures due to earthquakes in a 50 year period'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Introduction to applicable building codes in the United States including the IBC, and how it is used as a basis for the CBC. Necessary information on how ASCE 7 works and its relation to the CBC.',
    minutes: 60,
    pages: 10,
    problems: 3,
    difficulty: 0,
    img: '/images/lectures/03_Code.png',
    href: "03"
  },

  {
    title: '04: Site Conditions',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vQknLoQHe8mNiQ2Ic2liolj8oWzw9cPTfYuWeoykIzPbKeK3kDTtA7NcV5Lqu2fNg2P-egUT6FuB5iL/pub?embedded=true',
    references:[],
    summary:'The magnitude of seismic waves depend on local soil conditions. ASCE 7 provides a method for adjusting base line seismic accelerations for unique soil conditions, discussed in this lecture. Determining site condition parameters is a basic skill that will be tested thoroughly on the exam.',
    prereqs:['Basics of seismic waves', 'Spectral acceleration'],
    objectives:['How to define seismic risk in terms of probabilities','Calculate site class', 'Calculate design response acceleration'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Bridging the gap between general seismic maps and site specific conditions. Site factors based on soil characteristics.',
    minutes: 60,
    pages: 10,
    problems: 3,
    difficulty: 0,
    img: '/images/lectures/04_Site.png',
    href: "04"
  },

  {
    title: '05: Risk Categories',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vR4AJFSLC9m3AsH5npn-m7VfPP4SfIYK7ANlrOD1NvbdGxsTn5MVYz7hZT27Ub_8f7prOsQjuDZR-yH/pub?embedded=true',
    references:[],
    summary:'The expected performance of building structures is set by the type of structure. Depending on the importance of a building, stricter seismic guidelines and even larger design forces are required. ASCE 7 provides a procedure for setting up these guidelines through design categories and importance factors, discussed in this lecture.',
    prereqs:['none'],
    objectives:['Use the CBC to assess risk categories','Calculate Seismic Design Categories', 'Calculate Seismic Importance Factors'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Explanation of seismic risk category for building structures per ASCE 7 and the implications on seismic performance. An essential concept tested on the exam, and a basic starting point of all seismic design.',
    minutes: 60,
    pages: 10,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/05_Risk.png',
    href: "05"
  },

  {
    title: '06: Building Systems',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vTmlyy0HQ2Gdrn0goPAYsfl3fjF5X6rebd-4pv-Osh2zXtofAF33d6UU_EZOevgjsZNSL2cAYxhTzqW/pub?embedded=true',
    references:[],
    summary:'Modern buildings utilize vertical and lateral resisting systems to resist both gravity loads and seismic/wind loads. Different systems have better performance than others, and ASCE 7 places limitations on lateral systems depending on relative seismic risk. This lecture covers how to verify which type of lateral system can be used depending on seismic risk, as well as methods for calculating essential building properties like fundamental period',
    prereqs:['none'],
    objectives:['How to analyze a SDOF structure for moment and shear', 'Calculate the fundament period of an SDOF mass', 'Calculate building period using ASCE 7', 'Visually identify different structural systems', 'Assess structural height limitations', 'Understand the difference between stories and levels'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Diagrams and explanations of building systems including vertical resistand and lateral resisting systems. Basic calculations for lateral deflection, building periods, and degrees of freedom. This covers fundamentals taught in school that are assumed basic knowledge for using ASCE 7.',
    minutes: 60,
    pages: 10,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/06_Building.png',
    href: "06"
  },

  {
    title: '07: Ductility',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vTMQwKfzI9OhuFV6VtJb1oi8HQIBMFhXpgkW77zbJEn2GMeSx1qyIANBMuJIgPO5berjQKxPOTU_hlb/pub?embedded=true',
    references:[],
    summary:'Seismic loads are based in part on the concept of energy absorption via building lateral systems. Different systems can withstand more deformation before brittle failure. Ductility of lateral systems is represented via factors from ASCE 7 tables.',
    prereqs:['Understand different types of building lateral systems','Determine seismic design category'],
    objectives:['Know the relationship between R, Omega, and Cd','Understand the different phases of an inelastic force-deformation curve','Understand the requirements for using ductility values in building design'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'How the concept of ductility relates to defining the magnitude of seismic forces with the Response Modification Factor, Deflection Amplification Factor, and Overstrength Factor. How to select building lateral systems and determine their factors using ASCE 7. Limitations with different lateral systems based on seismic design categories.',
    minutes: 60,
    pages: 21,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/07_Ductility.png',
    href: "07"
  },

  {
    title: '08: Base Shear',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vT3e4VzrfjX2L6B4tf9plvqGlwuuTzmeb7ZJdp1ACI9PRnUZxozbMmLnnx_L0YfmlI-XQNwUosMj1yM/pub?embedded=true',
    references:[],
    summary:'The backbone of seismic calculations is based on one of the most familiar equations on all of physics. As earthquakes cause ground shaking and acceleration, the mass of a building structure is accelerated and creates forces that must be resistaed by the lateral system. ASCE 7 provides a procedural method of combining seismic accelerations and building mass into a static force.',
    prereqs:['Lateral System Ductility', 'Basic Earthquake theory'],
    objectives:['Determine effective seismic weight','Calculate seismic response coefficient Cs', 'Calculate Base Shear', 'Interpret a spectral response acceleration graph', 'Equivalent Lateral Force Procedure'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Determine seismic base shear for a building structure using the equivalent lateral force procedure in ASCE 7 with the response spectrum. How to categorize dead loads attributed to seismic mass, and approximate the fundamental period of a structure.',
    minutes: 60,
    pages: 23,
    problems: 5,
    difficulty: 2,
    img: '/images/lectures/08_Base.png',
    href: "08"
  },

  {
    title: '09: Force Distribution',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vS0bFc-R1Mkyvx0b-lrMjq_1SdjWeqlmikgVLEydVm6vmGXPlqcv6WGdgGmH1RE1RGPuIGM6sXouK4r/pub?embedded=true',
    references:[],
    summary:'Before a lateral system can be designed, the forces acting at each level of the structure must be determined. ASCE 7 provides a procedure for determining the forces at each level based on the relative weight tributary to that level and the total base shear.',
    prereqs:['Calculate Seismic Base Shear'],
    objectives:['Calculate tributary width', 'Calculate floor and wall weights', 'Calculate k factors', 'Calculate vertical distribution factor Cvx', 'Calculate vertical force distribution', 'Calculate horizontal force distribution'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Calculation process for determining Horizontal and Vertical Force Distribution along the height of a building structure. How to determine the seismic mass at individual levels in a building using tributary area methods. A relatively straighforward calculation procedure that will require practice to perform at speed. ',
    minutes: 60,
    pages: 31,
    problems: 5,
    difficulty: 2,
    img: '/images/lectures/09_Force.png',
    href: "09"
  },

  {
    title: '10: Drift',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vQbTIUgbGCs3z-PDv66ATWlF8eLPSppd66zGGcyIN7Bw9RGZhTyIASz8Hvc6zTo-t_9i3yp10K95FyM/pub?embedded=true',
    references:[],
    summary:'Building structures must not only be designed to withstand the force from seismic events, but also the lateral deflection associated with the forces. This lateral deflection is often computed relative to adjacent floors, known as story drift. ASCE 7 imposes drift limits on building structures, and also provides a procedure for adjusting seismic forces so that the deflections can be properly estimated for inelastic structures.',
    prereqs:['Vertical Force Distribution', 'Seismic Design Coefficients', 'Ductility', 'Seismic Base Shear'],
    objectives:['Understand deflection vs drift', 'Understand drift vs drift ratio', 'Determine correct forces for drift calculations', 'Calculate drift and drift ratios', 'Calculate structural separation', 'Assess when P-Delta effects must be included in design'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Drift calculation procedure and drift limits. Visual explanations of story drift versus story displacement, and how to use the correct seismic forces for drift checks. Additional information on buiding separation requirements and P-Delta effects.',
    minutes: 60,
    pages: 40,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/10_Drift.png',
    href: "10"
  },

  {
    title: '11: Flexible Diaphragms',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vSKqYE7pGVnX0gr066UPZ3HEokUvqDx8MweHrVeKI6PIwVWrIH5hcK_rIDeUo10sAz39zJSy_py1DVL/pub?embedded=true',
    references:[],
    summary:'Diaphragms are an essential element of building structures designed to resist seismic forces. Identifying the difference between a floor and a diaphragm requires examining the force flow from wall to lateral system. In addition to understanding the purpose of a diaphragm, there are two types each with their own analysis procedure. ASCE 7 provides procedure for determining forces to diaphragms. ASCE 7 does not provide the necessary background to perform diaphragm analysis, so this lecture provides extensive examples and background on analysis procedures for flexible diaphragms. The following lecture covers rigid diaphragms.',
    prereqs:['Vertical Force Distribution'],
    objectives:['Visually identify detailing requirements for diaphragm action', 'Understand requirements for a floor or roof to be considered an effective diaphragm', 'Calculate diaphragm design forces', 'Understand how flexible diaphragms can be treated as simply supported beams for analysis', 'Calculate bending moment in flexible diaphragm', 'Calculate unit shear in flexible diaphragm', 'Calculate shear forces to lateral systems from flexible diaphragms', 'Calculate flexible diaphragm chord forces', 'Calculate collector / drag forces'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Comprehensive introduction to the function and definition of building diaphragms. Calculation procedures for analyzing all relevant forces in flexible diaphragms with extensive examples. Collectors, chord forces, unit shear calculations. The second hardest thing to learn for the exam.',
    minutes: 80,
    pages: 71,
    problems: 5,
    difficulty: 3,
    img: '/images/lectures/11_Flexible.png',
    href: "11"
  },

  {
    title: '12: Rigid Diaphragms',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
    references:[],
    summary:'Rigid diaphragms transfer forces to the building lateral system based on the relative rigidity of the lateral system itself. Because the diaphragm is analytically very rigid compared to the lateral system, the analysis procedure is different, and more tedious, than that of flexible diaphragms. ASCE 7 provides requirements for location of forces applied through rigid diaphragm, and also provides checks to help the designer verify if the building contains torsional irregularities. ASCE 7 does not provide guidance on how to analyze the forces in the diaphragm itself, so this is covered extensively in this lecture.',
    prereqs:['Diaphragm Design Forces'],
    objectives:['Calculate center of mass of rigid diaphragm', 'Calculate center of rigidty at rigid diaphragm', 'Calculate relative rigidity of shearwalls', 'Calculate inherent torsional moment', 'Correctly apply the accidental torsional moment', 'Calculate torsional amplification factor Ax','Calculate forces to lateral resisting system'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Calculation procedure for rigid diaphragms. How the lateral resisting elements can change the force flow through a rigid diaphragm, and how to calculate relative rigidities of walls. Implementing accidental torsion per ASCE 7 requirements. The hardest thing to learn for the exam.',
    minutes: 80,
    pages: 60,
    problems: 5,
    difficulty: 3,
    img: '/images/lectures/12_Rigid.png',
    href: "12"
  },

  {
    title: '13: Irregularities',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
    references:[],
    summary:'The equivalent lateral force procedure is based somewhat on historical context of regular buildings. The analysis procedure is best suited for certain common building systems/layouts. If a building under design does not match the intent of the code provisions, then the structure may need to be designed with an entirely differently analysis procedure, or the seismic forces increased via redundancy factors. ASCE 7 provides guidelines for how to evaluate if a building structure has an irregularity, and how to select appropriate redundancy factors and analytical procedures.',
    prereqs:['Rigid diaphragms', 'Seismic base shear','Ductility', 'Building Period', 'Building systems'],
    objectives:['Identify Horizontal Irregularities', 'Identify Vertical Irregularities', 'Determine permitted analytical procedures', 'Determine redundancy factor ρ','Calculate seismic load effect Em', 'Evaluate torsional amplification factors'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Classifying Vertical and Horizontal building irregularities per ASCE 7. Using irregularities to evaluate permitted analytical procedures. Determining seismic design force using redundancy or omega factors.',
    minutes: 80,
    pages: 32,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/13_Irregularities.png',
    href: "13"
  },

  {
    title: '14: Non-structural Components',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
    references:[],
    summary:'There is increasingly more data that shows the biggest repair cost due to earthquakes is from damage to non-structural components. While the building lateral system provides life safety to the building occupants during a seismic event, the contents inside like walls and equipment also pose a safety risk, and a significant financial liability. ASCE 7 provides an explicit method for calculating design forces on non-structural components and other various non-buiding structures.',
    prereqs:['Seismic Base Shear'],
    objectives:['Determine appropriate ap, Rp factors', 'Calculate non-structural component forces Fp', 'Analyze forces in suspended equipment', 'Analyze overturning forces on floor mounted equipment'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Calculating forces on non-structural components. Determing overturning forces and brace forces for common components use basic static analysis. When to use Omega for concrete anchorage forces. Impacts of non-structural damage and costs during seismic events.',
    minutes: 60,
    pages: 43,
    problems: 5,
    difficulty: 2,
    img: '/images/lectures/14_Nonstructural.png',
    href: "14"
  },

  {
    title: '15: Seismic Detailing',
    googleLink:'https://docs.google.com/document/d/e/2PACX-1vRXMDtgh4vUDHDi0YmJNOHZK_S6x-XqTingo_6fTYuu-rvtGR4IcrbAy5rb0SvDE4gzDlGIEfbdFcx7/pub?embedded=true',
    references:[],
    summary:'A building structure cannot adequately resist seismic forces unless each element can transfer load to the next element. A critical aspect of seismic design is identifying load paths to allow forces to transfer in an efficient manner without failing connectors or elements theselves. This procedure of connecting elements together and providing adequate load path for lateral forces is known as seismic detailing',
    prereqs:['none'],
    objectives:['Visually identify proper detailing procedures for common lateral resisting systems'],
    video:'https://www.youtube.com/embed/b3ootXSAaqE',
    text: 'Holistic review of load path for lateral elements. How to identify basic requirements for good force transfer across shearwalls and into foundations. Critical connections for diaphragms to walls.',
    minutes: 40,
    pages: 20,
    problems: 5,
    difficulty: 1,
    img: '/images/lectures/15_Seismic.png',
    href: "15"
  },
];

module.exports = { lectureData };