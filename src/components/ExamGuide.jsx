import UnderConstruction from './UnderConstruction.jsx';
import {
  MapIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

export default function ExamGuide( { display=false }) {

  if (display === false) {
    return (
      <>
        <h1 data-testid="testExamGuideh1"> Exam Guide </h1>
        <UnderConstruction displayUnderConstruction={true}></UnderConstruction>
      </>
    );
  } else {


    function Link(link, text, color="text-sky-700") {
      return (
        <a target='_blank' rel='noopener noreferrer' className={`${color} underline`} href={link} >{text}</a>
      )
    }

    const handleSidebarClick = (id) => {
      var heading = document.getElementById(id);
      if (heading !== null) {
        var headingHeight = heading.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({top: headingHeight, behavior: 'smooth'});
      }
    }


    const questionData = [
      {
        title: 'Pass Rate',
        data: [
          {question:"How many questions do I need to answer correctly to pass?",
           answer:`The historical data for the cut rate ranges from 40% to 60%. If you walk away from the exam feeling confident about 3/4 of the questions, you're probably in good shape!`,
           image:""},
          {question:"How many people take the exam and pass it each year?",
           answer:"Over 2000 people each year take the exam, and typicall 50% of test takers pass.",
           image:""}
        ]
      },
      {
        title: 'Study Effort',
        data: [
          {question:"How much time is needed to study for the exam?",
           answer:`Everyone has a different level of availability for studying, but in general most people start studying at least a month in advance. For those actively using ASCE 7 at their workplace, the level of effort will be less than people unfamiliar with the standard.`,
           image:""},
          {question:"How many sample questions should I do before taking the exam?",
           answer:"If you can answer any sample question in under two minutes, you're in good shape. If you can look at a question and lay out the solution process in a few seconds, that's a nother great indiciator you've done enough practice. Speed is going to be the defining factor for how well you do on the exam, there's not enough time to figure out how to solve a question using any sort of reference material, you either know it or you don't. ",
           image:""}
        ]
      },
      {
        title: 'The day of the Exam',
        data: [
          {question:"What do I need to bring with me to the testing center?",
           answer:`You'll need to bring all your reference materials, calculator, and your ID. You will be provided pencils and scratch paper for the exam. You can also bring water/snacks with you to the test center and keep in your locker if you need.`,
           image:""},
          {question:"What reference material can I bring?",
           answer:"There are two basic limitations on your reference material. One is that all the material needs to fit within a standard banker's box. Second, all material needs to be bound. Bound material can be in a three ring binder, or bound as book. Loose papers are not allowed.",
           image:""},
           {question:"What calculator can I bring to the exam?",
           answer:<>The board provides specific calculators that you can bring. Note it's OK to bring two calculators to the exam, so one can be your backup!<ul className='pl-8 list-disc'><li>fx-115 and fx-991 models</li><li> HP 33s and HP 35s models </li><li> TI-30X and TI-36X models </li></ul></>,
           image:""}
        ]
      },
      {
        title: `PE license info`,
        data: [
          {question:"What is the renewal process looks like once I get my PE license?",
           answer:"Once you obtain your PE license for the first time, you will have effectively paid for it to be valid for the next two years. As the two year anniversary approaches, the board will send you a mailed letter with instructions for renewing your license, which will cost $180. This renewal will repeat every two years if you wish to keep your license valid.",
           image:""},
          {question:"If I want to get a PE license in another state, how do I do that?",
           answer:"Once you have your California PE license, you can obtain a PE license in any other state following the Comity process. This typically entails having your experience verified by the state of interest via NCEES, paying any fees, and submitting a formal application. Be aware that some states require continuing education units to maintain your license there, which California does not.",
           image:""},
           {question:"What can you do with California PE License?",
           answer:"As a licensed Civil Engineer in the state of California, you are authorized to prepare, sign, seal, and submit engineering plans and drawings for approval to building agencies. This does not apply to buiding structures under the jurisdiction of OSHPD or the DSA (hospitals and public schools), where a Structural Engineer license is required. Newly licensed engineers typically don't start using their stamp right away. In addition, if you use your stamp you will need to carry the appropriate liability insurance.",
           image:""}
        ]
      }
    ];

    const leftSidebarData = [
      {icon: ClipboardDocumentCheckIcon, text: 'General Information'},
      {icon: MapIcon, text: 'Pathway to License'},
      {icon: ChatBubbleLeftRightIcon, text: 'FAQ'}
    ]

    const LeftSidebar =
    <div className='sm:w-0 hidden lg:block lg:w-2/12 pt-8'>
      <aside className='text-left sticky top-4 bottom-4 pl-2 pb-8 rounded-lg'>
      {leftSidebarData.map((item) => {
        return (
        <span onClick={() => handleSidebarClick(item.text)} key={item.text} className='flex items-center my-4  rounded-lg hover:cursor-pointer group hover:bg-sky-300 hover:shadow-lg'>
          <item.icon className='h-5 w-5 flex-none text-gray-400 mx-2 group-hover:text-white' aria-hidden='true'/>
          <p className='text-md text-left text-slate-700 group-hover:text-white'>{item.text}</p>
        </span>
        )
      }
      )}
        <ul>
          {questionData.map((item) => <li onClick={() => handleSidebarClick(item.title)} className='text-sm ml-8 pl-2 text-slate-700 mb-2 rounded-lg hover:cursor-pointer hover:bg-sky-300 hover:shadow-lg hover:text-white' key={item.title}>{item.title}</li>)}
        </ul>
      </aside>
    </div>

    const rightSidebarData = [
      {link:"https://www.bpelsg.ca.gov/applicants/exam_schedule_final_filing_dates.pdf", text:"Exam Schedules"},
      {link:"https://www.bpelsg.ca.gov/applicants/exam_statistics.pdf",text:"Exam Pass Rate"},
      {link:"https://www.prometric.com/sites/default/files/2020-02/Civil%20Seismic%20Principles%20CIB_4.pdf", text:"Prometric Exam Info"}
    ]

    const RightSidebar =
    <div className='sm:w-0 hidden lg:block lg:w-2/12'>
      <aside className='text-center sticky top-0'>
        <p className='text-lg text-left py-4 text-slate-500'>References</p>
          <ul className='text-left'>
            {rightSidebarData.map( (item) => {
              return (
                <li key={item.text} className="my-2 hover:text-sky-700">{Link(item.link,item.text)}</li>
              )
            })}
          </ul>
      </aside>
    </div>

    return (
      <main data-testid="testExamGuideh1" className='max-w-screen-2xl m-auto px-4'>
        <div className='flex h-full pt-4'>
          {/* Left Sidebar */}
          {LeftSidebar}

          <section className='sm:w-full  lg:w-8/12 overflow-auto flex flex-col justify-center px-4'>
            {/* General Information */}
            <article className='pb-12'>
              <p id={leftSidebarData[0].text} className='m-auto w-fit border-b-2 border-orange-300/50 text-3xl font-semibold tracking-wide text-center text-amber-600 max-w-full pt-4 px-2'>{leftSidebarData[0].text}n</p>
              <div className='max-w-full text-left px-4 mt-4'>
                <p className='text-left pb-2'>
                The California Seismic Principles Exam is one of two state specific exams required to obtain a California Civil PE license. The exam is computer based, with a total of 55 multiple choice questions over a 2.5 hour duration. Reference materials are allowed to be brought into the exam, at a minimum ASCE 7 will be needed on hand to pass the exam.
                </p>
                <p className='text-left pb-2'>
                Passing the Seismic Exam is the last stage to obtaining a California PE License, along with passing the Surveying Exam. Each of these state specific exams is narrow in scope, requiring focused time to study. It is not likely that a test taker can pass them based on work experience alone due to the fast paced nature of the exam.
                </p>
              </div>
            </article>

            {/* Pathway to License */}
            <article className='pb-12'>
              <p id={leftSidebarData[1].text} className=' text-3xl w-fit m-auto border-b-2 border-sky-300/50 font-semibold tracking-wide text-center text-sky-600 max-w-full pt-4 px-2'>{leftSidebarData[1].text}</p>
              <div className='max-w-full text-left px-4 my-4'>
                <h3 className='font-semibold pt-2 text-xl text-slate-700'>Why obtain a PE license?</h3>
                <p className='text-left pb-2'>
                For those thinking about whether or not to obtain a Professional Engineer’s (PE) license, you may have a few questions on your mind. Why should I spend my time studying for the PE license when I can work full time and gain experience through work? Why should I spend so much money on all these applications? I can still make a living without a PE license, right?
                </p>
                <p className='text-left'>
                To start, yes, you have to study hard and sacrifice your free time to obtain a license. Also, it is true that you don’t necessarily need a PE license in order to be successful in your career. Nevertheless, obtaining a PE license provides possibilities that make it worth it if you've made it this far. Obtaining your license can open up doors to new opportunities that require a valid license, and once you've obtained your license you don't have to take the exams again.
                </p>

                <h3 className='font-semibold pt-2 text-xl text-slate-700 mt-4'>Process to Obtaining your PE License</h3>
                <ol className='text-left pb-2 pl-4 list-decimal space-y-4'>
                  <li>Register and pass the Fundamentals of Engineering (FE) exam. You can register for the FE exam on the National Council of Examiners for Engineering and Surveying (NCEES) {Link("https://ncees.org/exams/fe-exam/","website")}. The exam fee is $175 and the exam is offered year round at any NCEES approved test centers.</li>
                  <li>Once you pass the FE exam, apply for the Engineer in Training (EIT) Certification. The application fee for the EIT is $75. The application can be submitted online through the {Link("https://www.bpelsg.ca.gov/pubs/forms/eit-lsitapp.pdf","BPELSG Connect portal")}. To apply, you must:</li>
                    <ul className='pl-2 list-disc'>
                      <li>Have three years or more of engineering-related work experience or ABET certified university engineering education. </li>
                      <li>Have never been convicted of a crime related to engineering practice.</li>
                      <li>Previously passed the FE exam.</li>
                      <li> {Link("https://www.bpelsg.ca.gov/applicants/fingerprinting_faqs_1.shtml","Submit official fingerprints")}</li>
                    </ul>
                  <li>After obtaining the EIT certificate, apply for and take the 8-hour national PE exam. This exam has 80 multiple choice questions, is offered on a continuous basis, and has two separate halfs. The first half is based in general Civil Engineering principles, while the second half is more in depth focused on one sector, which you can choose from. The PE exam used to be in person and also required you to bring your own reference materials, but after the pandemic switched to computer based. The reference materials are also provided on the computer as well. The cost for the exam is $375. More information can be found at {Link("https://ncees.org/exams/pe-exam/civil/", "the NCEES website")}</li>
                  <li>Accumulate the qualifying experience. There are various pathways to accomplish this experience (see below flowchart), but typically you need 6 years of qualifying experience. Most people have an ABET accredited bachelor’s degree in Civil Engineering that counts for 4 years of qualifying experience. From there you’ll just need two more years, which would mean two years of working under a registered Professional Engineer doing qualifying work. If you get a Master’s degree in Civil Engineering, that will also count as 1 year!</li>
                  <li>Once you gain the required experience, gather your education and experience verification documents to submit the PE application package to the Board for Professional Engineers, Land Surveyors, and Geologists. This application is now submitted online through the {Link("https://connect.bpelsg.ca.gov/#/", "BPELSG Connect portal")}. The application fee for the license itself is $175, in addition to a $175 fee each for both the seismic and surveying exams. The total cost to the Board will come out to be $525 when you first apply for the license (because you'll also typically apply to take the seismic and surveying exam at the same time). See {Link("https://www.bpelsg.ca.gov/applicants/application_fees.shtml", "here")} for application costs.</li>
                  <li>After you receive an Authorization to Test approval from the Board, you can take the seismic and surveying exams during one of two following quarters, depending on when you are approved. These are computer-based exams offered by Prometric Testing. Both exams are 2.5 hours long and consist of 55 multiple-choice questions. In addition to the exam fees to the Board listed previously, an additional $70 fee for each exam must be paid to Prometric Testing. <br/> Optional: If you fail either exam, you'll need to obtain re-authorization from the Board (and pay the $175 to them), then re-schedule the exam with Prometric (and pay them their $70 fee)</li>
                  <li>Once you pass both the Seismic and Surveying exam you're all done! If the Board gave you authorization to take the exams in the first place, they've effectively already confirmed you have the necessary experience to be a licensed engineer. With the exams complete, you'll recieve a letter in the mail with your license card and a formal paper that can be framed.</li>

                </ol>
              </div>
            </article>

            {/* FAQ Section */}
            <article>
              <p id={leftSidebarData[2].text} className=' text-3xl w-fit m-auto border-b-2 border-orange-300/50 font-semibold tracking-wide text-center text-amber-600 max-w-full pt-4 px-2'>{leftSidebarData[2].text}</p>
              <div className='max-w-full text-left px-4 mt-4'>
                {questionData.map((category) =>
                    <section className='py-4' key={category.title}>
                      <h3 id={category.title} className='font-semibold pt-2 text-2xl text-slate-700'>{category.title}</h3>
                      {category.data.map((data) =>
                        <div className='py-2' key={data.question}>
                          <p className='font-semibold pt-2 text-lg text-slate-700'>{data.question}</p>
                          <span className=''> {data.answer}</span>
                        </div>
                      )}
                    </section>
                )}
              </div>
            </article>
          </section>

          {/* Right Sidebar */}
          {RightSidebar }
        </div>
      </main>
    )
  }


}