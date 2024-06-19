const randomExams = [
  {
    name: 'Sample Exam-1',
    questions: [
      {
        question:
          'The design earthquake motion per ASCE/SEI7 provi-sions corresponds to',
        options: [
          {
            id: 0,
            text: '1.5 times the maximum considered carthquake ground motion',
            isCorrect: false,
          },
          {
            id: 1,
            text: '2/3 times the maximum considered earthquake design motion',
            isCorrect: false,
          },
          {
            id: 2,
            text: '2/3 times the earthquake that hes a 10% probability of being exceeded in 50 years',
            isCorrect: false,
          },
          {
            id: 3,
            text: '3/2 times the earthquake that has a 10% probability of being exceeded in 50 years',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'A 155 ft (47.24 m) steel building in Los Angeles will be braced laterally by a stecl cccentrically braced frame structure (.c., non-moment resisting connections at columns away from links). The structure will be utilized as a communication center that can respond in cmorgencies. The geotechnical engineer estimates the 5 and, values are 0.2 and 0.5. The design base shear using the equivalent lateral-force procedure is most nearly',
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can dam-age even well-designed structures?
          \n(I) large settlement or lateral spreading of soil be-neath structures
          \n(II) ground movements associated with surface rupture
          \n(III) slope failure`,
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can damage even well-designed structures?
        \n(I) large settlement or lateral spreading of soil beneath structures
        \n(II) ground movements associated with surface rupture
        \n(III) slope failure`,
        question_img: ['/images/questions/q4.png'],
        options: [
          {
            id: 0,
            text: 'Tonly',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which ASCE/SEIT formula should be used to determine the total design lateral seismic foce on cements of Structures, ponstroctural components, and equipment supported by structures?`,
        question_img: ['/images/questions/q5q6q7_1.png','/images/questions/q5q6q7_2.png','/images/questions/q5q6q7_3.png'],
        options: [
          {
            id: 0,
            text: 'Option 1',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_1.png',
              alt: 'Image 1',
            },
          },
          {
            id: 1,
            text: 'Option 2',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_2.png',
              alt: 'Image 2',
            },
          },
          {
            id: 2,
            text: 'Option 3',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_3.png',
              alt: 'Image 3',
            },
          },
          {
            id: 3,
            text: 'Option 4',
            isCorrect: true,
            image: {
              src: '/images/questions/a5_4.png',
              alt: 'Image 4',
            },
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `In California, which of the following types of building construction havo generally had a good seismic performance record?
        \n(I) uarenforced masonry (URM) bearing wall buildings
        \n(II) stool and concrete frames with URM infill walls
        \n(III) nonductile concrete frames`,
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three special steel moment-resisting frame structures are shown in the following illustrations. For all structure, the design spectral response acceleration parameters ace Sp = 0.75, and Spr = 06, the sisnic design category 1 F, and tho occupancy category is III. Based on ASCE/SEIT requirements, which of the following structures can be designed using the oquivalent tera force procedure or its seismic forces systems?`,
        options: [
          {
            id: 0,
            text: 'none',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `For a one-story wood-frame building with a wood struetural panel roof diaphragm, consider two walls: the west wall at midspan and the south wall at the intersection of lines X and 1. Which statement is correct? The redundancy reliability factor, p, is 1.0.`,
        question_img:['/images/questions/q8.png'],
        options: [
          {
            id: 0,
            text: 'The chord forces in both walls are the same.',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'The chord force in the south wall is twice the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'The chord force in the south wall is half the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'The chord force in the south wall is zero.',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `An existing wood-frame single-family home in Los Angeles has a crawl space (cripple wall) between the raised concrete foundation and the first floor as shown. What strengthening measures will enhance the seismic resis tance of this deficient cripple wall?
        \n(I) using anchor bolts to connect the sill plates and the foundation
        \n(II) using hold-downs to anchor the wood-stud walls to the foundation
        \n(III) nailing wood structural panels on the inside of the cripple studs`,
        question_img: ['/images/questions/q9.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three large structures with different types of structural systems are shown. Which of the following structures lacks a complete vertical load-carrying space frame?`,
        question_img: ['/images/questions/q10_1.png', '/images/questions/q10_2.png', '/images/questions/q10_3.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?`,
        options: [
          {
            id: 0,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },

      // Repeat

      {
        question:
          'The design earthquake motion per ASCE/SEI7 provi-sions corresponds to',
        options: [
          {
            id: 0,
            text: '1.5 times the maximum considered carthquake ground motion',
            isCorrect: false,
          },
          {
            id: 1,
            text: '2/3 times the maximum considered earthquake design motion',
            isCorrect: false,
          },
          {
            id: 2,
            text: '2/3 times the earthquake that hes a 10% probability of being exceeded in 50 years',
            isCorrect: false,
          },
          {
            id: 3,
            text: '3/2 times the earthquake that has a 10% probability of being exceeded in 50 years',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'A 155 ft (47.24 m) steel building in Los Angeles will be braced laterally by a stecl cccentrically braced frame structure (.c., non-moment resisting connections at columns away from links). The structure will be utilized as a communication center that can respond in cmorgencies. The geotechnical engineer estimates the 5 and, values are 0.2 and 0.5. The design base shear using the equivalent lateral-force procedure is most nearly',
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can dam-age even well-designed structures?
          \n(I) large settlement or lateral spreading of soil be-neath structures
          \n(II) ground movements associated with surface rupture
          \n(III) slope failure`,
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can damage even well-designed structures?
        \n(I) large settlement or lateral spreading of soil beneath structures
        \n(II) ground movements associated with surface rupture
        \n(III) slope failure`,
        question_img: ['/images/questions/q4.png'],
        options: [
          {
            id: 0,
            text: 'Tonly',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which ASCE/SEIT formula should be used to determine the total design lateral seismic foce on cements of Structures, ponstroctural components, and equipment supported by structures?`,
        question_img: ['/images/questions/q5q6q7_1.png','/images/questions/q5q6q7_2.png','/images/questions/q5q6q7_3.png'],
        options: [
          {
            id: 0,
            text: 'Option 1',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_1.png',
              alt: 'Image 1',
            },
          },
          {
            id: 1,
            text: 'Option 2',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_2.png',
              alt: 'Image 2',
            },
          },
          {
            id: 2,
            text: 'Option 3',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_3.png',
              alt: 'Image 3',
            },
          },
          {
            id: 3,
            text: 'Option 4',
            isCorrect: true,
            image: {
              src: '/images/questions/a5_4.png',
              alt: 'Image 4',
            },
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `In California, which of the following types of building construction havo generally had a good seismic performance record?
        \n(I) uarenforced masonry (URM) bearing wall buildings
        \n(II) stool and concrete frames with URM infill walls
        \n(III) nonductile concrete frames`,
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three special steel moment-resisting frame structures are shown in the following illustrations. For all structure, the design spectral response acceleration parameters ace Sp = 0.75, and Spr = 06, the sisnic design category 1 F, and tho occupancy category is III. Based on ASCE/SEIT requirements, which of the following structures can be designed using the oquivalent tera force procedure or its seismic forces systems?`,
        options: [
          {
            id: 0,
            text: 'none',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `For a one-story wood-frame building with a wood struetural panel roof diaphragm, consider two walls: the west wall at midspan and the south wall at the intersection of lines X and 1. Which statement is correct? The redundancy reliability factor, p, is 1.0.`,
        question_img:['/images/questions/q8.png'],
        options: [
          {
            id: 0,
            text: 'The chord forces in both walls are the same.',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'The chord force in the south wall is twice the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'The chord force in the south wall is half the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'The chord force in the south wall is zero.',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `An existing wood-frame single-family home in Los Angeles has a crawl space (cripple wall) between the raised concrete foundation and the first floor as shown. What strengthening measures will enhance the seismic resis tance of this deficient cripple wall?
        \n(I) using anchor bolts to connect the sill plates and the foundation
        \n(II) using hold-downs to anchor the wood-stud walls to the foundation
        \n(III) nailing wood structural panels on the inside of the cripple studs`,
        question_img: ['/images/questions/q9.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three large structures with different types of structural systems are shown. Which of the following structures lacks a complete vertical load-carrying space frame?`,
        question_img: ['/images/questions/q10_1.png', '/images/questions/q10_2.png', '/images/questions/q10_3.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?`,
        options: [
          {
            id: 0,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },

      {
        question:
          'The design earthquake motion per ASCE/SEI7 provi-sions corresponds to',
        options: [
          {
            id: 0,
            text: '1.5 times the maximum considered carthquake ground motion',
            isCorrect: false,
          },
          {
            id: 1,
            text: '2/3 times the maximum considered earthquake design motion',
            isCorrect: false,
          },
          {
            id: 2,
            text: '2/3 times the earthquake that hes a 10% probability of being exceeded in 50 years',
            isCorrect: false,
          },
          {
            id: 3,
            text: '3/2 times the earthquake that has a 10% probability of being exceeded in 50 years',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'A 155 ft (47.24 m) steel building in Los Angeles will be braced laterally by a stecl cccentrically braced frame structure (.c., non-moment resisting connections at columns away from links). The structure will be utilized as a communication center that can respond in cmorgencies. The geotechnical engineer estimates the 5 and, values are 0.2 and 0.5. The design base shear using the equivalent lateral-force procedure is most nearly',
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can dam-age even well-designed structures?
          \n(I) large settlement or lateral spreading of soil be-neath structures
          \n(II) ground movements associated with surface rupture
          \n(III) slope failure`,
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can damage even well-designed structures?
        \n(I) large settlement or lateral spreading of soil beneath structures
        \n(II) ground movements associated with surface rupture
        \n(III) slope failure`,
        question_img: ['/images/questions/q4.png'],
        options: [
          {
            id: 0,
            text: 'Tonly',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which ASCE/SEIT formula should be used to determine the total design lateral seismic foce on cements of Structures, ponstroctural components, and equipment supported by structures?`,
        question_img: ['/images/questions/q5q6q7_1.png','/images/questions/q5q6q7_2.png','/images/questions/q5q6q7_3.png'],
        options: [
          {
            id: 0,
            text: 'Option 1',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_1.png',
              alt: 'Image 1',
            },
          },
          {
            id: 1,
            text: 'Option 2',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_2.png',
              alt: 'Image 2',
            },
          },
          {
            id: 2,
            text: 'Option 3',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_3.png',
              alt: 'Image 3',
            },
          },
          {
            id: 3,
            text: 'Option 4',
            isCorrect: true,
            image: {
              src: '/images/questions/a5_4.png',
              alt: 'Image 4',
            },
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `In California, which of the following types of building construction havo generally had a good seismic performance record?
        \n(I) uarenforced masonry (URM) bearing wall buildings
        \n(II) stool and concrete frames with URM infill walls
        \n(III) nonductile concrete frames`,
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three special steel moment-resisting frame structures are shown in the following illustrations. For all structure, the design spectral response acceleration parameters ace Sp = 0.75, and Spr = 06, the sisnic design category 1 F, and tho occupancy category is III. Based on ASCE/SEIT requirements, which of the following structures can be designed using the oquivalent tera force procedure or its seismic forces systems?`,
        options: [
          {
            id: 0,
            text: 'none',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `For a one-story wood-frame building with a wood struetural panel roof diaphragm, consider two walls: the west wall at midspan and the south wall at the intersection of lines X and 1. Which statement is correct? The redundancy reliability factor, p, is 1.0.`,
        question_img:['/images/questions/q8.png'],
        options: [
          {
            id: 0,
            text: 'The chord forces in both walls are the same.',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'The chord force in the south wall is twice the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'The chord force in the south wall is half the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'The chord force in the south wall is zero.',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `An existing wood-frame single-family home in Los Angeles has a crawl space (cripple wall) between the raised concrete foundation and the first floor as shown. What strengthening measures will enhance the seismic resis tance of this deficient cripple wall?
        \n(I) using anchor bolts to connect the sill plates and the foundation
        \n(II) using hold-downs to anchor the wood-stud walls to the foundation
        \n(III) nailing wood structural panels on the inside of the cripple studs`,
        question_img: ['/images/questions/q9.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three large structures with different types of structural systems are shown. Which of the following structures lacks a complete vertical load-carrying space frame?`,
        question_img: ['/images/questions/q10_1.png', '/images/questions/q10_2.png', '/images/questions/q10_3.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?`,
        options: [
          {
            id: 0,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },

      {
        question:
          'The design earthquake motion per ASCE/SEI7 provi-sions corresponds to',
        options: [
          {
            id: 0,
            text: '1.5 times the maximum considered carthquake ground motion',
            isCorrect: false,
          },
          {
            id: 1,
            text: '2/3 times the maximum considered earthquake design motion',
            isCorrect: false,
          },
          {
            id: 2,
            text: '2/3 times the earthquake that hes a 10% probability of being exceeded in 50 years',
            isCorrect: false,
          },
          {
            id: 3,
            text: '3/2 times the earthquake that has a 10% probability of being exceeded in 50 years',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'A 155 ft (47.24 m) steel building in Los Angeles will be braced laterally by a stecl cccentrically braced frame structure (.c., non-moment resisting connections at columns away from links). The structure will be utilized as a communication center that can respond in cmorgencies. The geotechnical engineer estimates the 5 and, values are 0.2 and 0.5. The design base shear using the equivalent lateral-force procedure is most nearly',
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can dam-age even well-designed structures?
          \n(I) large settlement or lateral spreading of soil be-neath structures
          \n(II) ground movements associated with surface rupture
          \n(III) slope failure`,
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can damage even well-designed structures?
        \n(I) large settlement or lateral spreading of soil beneath structures
        \n(II) ground movements associated with surface rupture
        \n(III) slope failure`,
        question_img: ['/images/questions/q4.png'],
        options: [
          {
            id: 0,
            text: 'Tonly',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which ASCE/SEIT formula should be used to determine the total design lateral seismic foce on cements of Structures, ponstroctural components, and equipment supported by structures?`,
        question_img: ['/images/questions/q5q6q7_1.png','/images/questions/q5q6q7_2.png','/images/questions/q5q6q7_3.png'],
        options: [
          {
            id: 0,
            text: 'Option 1',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_1.png',
              alt: 'Image 1',
            },
          },
          {
            id: 1,
            text: 'Option 2',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_2.png',
              alt: 'Image 2',
            },
          },
          {
            id: 2,
            text: 'Option 3',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_3.png',
              alt: 'Image 3',
            },
          },
          {
            id: 3,
            text: 'Option 4',
            isCorrect: true,
            image: {
              src: '/images/questions/a5_4.png',
              alt: 'Image 4',
            },
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `In California, which of the following types of building construction havo generally had a good seismic performance record?
        \n(I) uarenforced masonry (URM) bearing wall buildings
        \n(II) stool and concrete frames with URM infill walls
        \n(III) nonductile concrete frames`,
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three special steel moment-resisting frame structures are shown in the following illustrations. For all structure, the design spectral response acceleration parameters ace Sp = 0.75, and Spr = 06, the sisnic design category 1 F, and tho occupancy category is III. Based on ASCE/SEIT requirements, which of the following structures can be designed using the oquivalent tera force procedure or its seismic forces systems?`,
        options: [
          {
            id: 0,
            text: 'none',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `For a one-story wood-frame building with a wood struetural panel roof diaphragm, consider two walls: the west wall at midspan and the south wall at the intersection of lines X and 1. Which statement is correct? The redundancy reliability factor, p, is 1.0.`,
        question_img:['/images/questions/q8.png'],
        options: [
          {
            id: 0,
            text: 'The chord forces in both walls are the same.',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'The chord force in the south wall is twice the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'The chord force in the south wall is half the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'The chord force in the south wall is zero.',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `An existing wood-frame single-family home in Los Angeles has a crawl space (cripple wall) between the raised concrete foundation and the first floor as shown. What strengthening measures will enhance the seismic resis tance of this deficient cripple wall?
        \n(I) using anchor bolts to connect the sill plates and the foundation
        \n(II) using hold-downs to anchor the wood-stud walls to the foundation
        \n(III) nailing wood structural panels on the inside of the cripple studs`,
        question_img: ['/images/questions/q9.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three large structures with different types of structural systems are shown. Which of the following structures lacks a complete vertical load-carrying space frame?`,
        question_img: ['/images/questions/q10_1.png', '/images/questions/q10_2.png', '/images/questions/q10_3.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?`,
        options: [
          {
            id: 0,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'The design earthquake motion per ASCE/SEI7 provi-sions corresponds to',
        options: [
          {
            id: 0,
            text: '1.5 times the maximum considered carthquake ground motion',
            isCorrect: false,
          },
          {
            id: 1,
            text: '2/3 times the maximum considered earthquake design motion',
            isCorrect: false,
          },
          {
            id: 2,
            text: '2/3 times the earthquake that hes a 10% probability of being exceeded in 50 years',
            isCorrect: false,
          },
          {
            id: 3,
            text: '3/2 times the earthquake that has a 10% probability of being exceeded in 50 years',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question:
          'A 155 ft (47.24 m) steel building in Los Angeles will be braced laterally by a stecl cccentrically braced frame structure (.c., non-moment resisting connections at columns away from links). The structure will be utilized as a communication center that can respond in cmorgencies. The geotechnical engineer estimates the 5 and, values are 0.2 and 0.5. The design base shear using the equivalent lateral-force procedure is most nearly',
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can dam-age even well-designed structures?
          \n(I) large settlement or lateral spreading of soil be-neath structures
          \n(II) ground movements associated with surface rupture
          \n(III) slope failure`,
        options: [
          {
            id: 0,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 1,
            text: '0026w',
            isCorrect: false,
          },
          {
            id: 2,
            text: '0038W',
            isCorrect: false,
          },
          {
            id: 3,
            text: '0.044W',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which of the following geotechnical conditions can damage even well-designed structures?
        \n(I) large settlement or lateral spreading of soil beneath structures
        \n(II) ground movements associated with surface rupture
        \n(III) slope failure`,
        question_img: ['/images/questions/q4.png'],
        options: [
          {
            id: 0,
            text: 'Tonly',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Which ASCE/SEIT formula should be used to determine the total design lateral seismic foce on cements of Structures, ponstroctural components, and equipment supported by structures?`,
        question_img: ['/images/questions/q5q6q7_1.png','/images/questions/q5q6q7_2.png','/images/questions/q5q6q7_3.png'],
        options: [
          {
            id: 0,
            text: 'Option 1',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_1.png',
              alt: 'Image 1',
            },
          },
          {
            id: 1,
            text: 'Option 2',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_2.png',
              alt: 'Image 2',
            },
          },
          {
            id: 2,
            text: 'Option 3',
            isCorrect: false,
            image: {
              src: '/images/questions/a5_3.png',
              alt: 'Image 3',
            },
          },
          {
            id: 3,
            text: 'Option 4',
            isCorrect: true,
            image: {
              src: '/images/questions/a5_4.png',
              alt: 'Image 4',
            },
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `In California, which of the following types of building construction havo generally had a good seismic performance record?
        \n(I) uarenforced masonry (URM) bearing wall buildings
        \n(II) stool and concrete frames with URM infill walls
        \n(III) nonductile concrete frames`,
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three special steel moment-resisting frame structures are shown in the following illustrations. For all structure, the design spectral response acceleration parameters ace Sp = 0.75, and Spr = 06, the sisnic design category 1 F, and tho occupancy category is III. Based on ASCE/SEIT requirements, which of the following structures can be designed using the oquivalent tera force procedure or its seismic forces systems?`,
        options: [
          {
            id: 0,
            text: 'none',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `For a one-story wood-frame building with a wood struetural panel roof diaphragm, consider two walls: the west wall at midspan and the south wall at the intersection of lines X and 1. Which statement is correct? The redundancy reliability factor, p, is 1.0.`,
        question_img:['/images/questions/q8.png'],
        options: [
          {
            id: 0,
            text: 'The chord forces in both walls are the same.',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'The chord force in the south wall is twice the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'The chord force in the south wall is half the chord force in the west wall.',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'The chord force in the south wall is zero.',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `An existing wood-frame single-family home in Los Angeles has a crawl space (cripple wall) between the raised concrete foundation and the first floor as shown. What strengthening measures will enhance the seismic resis tance of this deficient cripple wall?
        \n(I) using anchor bolts to connect the sill plates and the foundation
        \n(II) using hold-downs to anchor the wood-stud walls to the foundation
        \n(III) nailing wood structural panels on the inside of the cripple studs`,
        question_img: ['/images/questions/q9.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'I and II',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'I, II, and III',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Three large structures with different types of structural systems are shown. Which of the following structures lacks a complete vertical load-carrying space frame?`,
        question_img: ['/images/questions/q10_1.png', '/images/questions/q10_2.png', '/images/questions/q10_3.png'],
        options: [
          {
            id: 0,
            text: 'I only',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'II only',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'III only',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'none of the above',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        question: `Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?
                    \nStructures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions Structures are most likely to be damaged by liquefaction if they are supported on which of the following foundations and soil conditions?`,
        options: [
          {
            id: 0,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 1,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 2,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: false,
          },
          {
            id: 3,
            text: 'isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil, isolated spread footings supported on a soil profile consisting of predominantly saturated cohe-sionless soil',
            isCorrect: true,
          },
        ],
        solution:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },

    ],
  },
];

export { randomExams };
