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



    const questionData = [
      {
        title: 'Pass Rate',
        data: [
          {question:"How many questions do I need to answer correctly to pass?",
           answer:`The historical data for the cut rate ranges from 40% to 60%. If you walk away from the exam feeling confident about 3/4 of the questions, you're probably in good shape!`,
           image:""},
          {question:"How many people take the exam and pass it each year?",
           answer:"The board doesn't post the raw data anymore for number of test takers or the pass rate, however we can infer there are over 1500 people taking the test each year based on historic data. (In addition, if you checkout license info from new PE licenses there's around 1500 new licenses granted each year, so counting people retaking the test there should way more than 1500 test takers). The pass rate form historic data centered around 50%.",
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
           answer:<><p>The board provides specific calculators that you can bring. Note it's OK to bring two calculators to the exam, so one can be your backup!</p><ul><li>fx-115 and fx-991 models</li><li> HP 33s and HP 35s models </li><li> TI-30X and TI-36X models </li></ul></>,
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

    const Sidebar =
    <aside className='text-left sticky h-[calc(100vh-200px)] top-4 pl-2 pb-16 rounded-lg bg-[rgb(246,209,164)] bg-[linear-gradient(196deg, rgba(246,209,164,1) 0%, rgba(246,223,155,1) 49%, rgba(182,216,248,1) 78%)]'>
      <span className='flex items-center pt-10'>
        <ClipboardDocumentCheckIcon className="h-5 w-5 flex-none text-gray-400 mx-2" aria-hidden="true"/>
        <p className='text-md text-left py-3 text-slate-700'>General Information</p>
      </span>
      <span className='flex items-center pt-10'>
        <MapIcon className="h-5 w-5 flex-none text-gray-400 mx-2" aria-hidden="true"/>
        <p className='text-md text-left py-3 text-slate-700'>Pathway to License</p>
      </span>
      <span className='flex items-center pt-10'>
        <ChatBubbleLeftRightIcon className="h-5 w-5 flex-none text-gray-400 mx-2" aria-hidden="true"/>
        <p className='text-md text-left py-3 text-slate-700'>FAQ</p>
      </span>
      <ul>
        {questionData.map((item) => <li className='text-sm pl-10 text-slate-700 mb-2' key={item.title}>{item.title}</li>)}
      </ul>
    </aside>

    return (
      <main data-testid="testExamGuideh1" className='max-w-screen-2xl m-auto px-4'>
        <div className='flex h-full pt-4'>
          <div className='sm:w-0 hidden lg:block lg:w-2/12 pt-8'>
            {Sidebar}
          </div>

          <section className='sm:w-full  lg:w-8/12 overflow-auto flex flex-col justify-center px-4'>
            <article>
              <p className='m-auto w-fit border-b-2 border-orange-300/50 text-3xl font-semibold tracking-wide text-center text-amber-600 max-w-full pt-4 px-2'>General Exam Information</p>
              <div className='max-w-full text-left px-4 mt-4'>
                <h3 className='font-semibold pt-2 text-xl text-slate-700'>Sub Heading</h3>
                <p className='text-left pb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className='text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h3 className='font-semibold pt-2 text-xl text-slate-700'>Sub Heading</h3>
                <p className='text-left pb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className='text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </article>

            <article>
              <p className=' text-3xl w-fit m-auto border-b-2 border-sky-300/50 font-semibold tracking-wide text-center text-sky-600 max-w-full pt-4 px-2'>Pathway to License</p>
              <div className='max-w-full text-left px-4 mt-4'>
                <h3 className='font-semibold pt-2 text-xl text-slate-700'>Sub Heading</h3>
                <p className='text-left pb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className='text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h3 className='font-semibold pt-2 text-xl text-slate-700'>Sub Heading</h3>
                <p className='text-left pb-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className='text-left'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </article>

            <article>
              <p className=' text-3xl w-fit m-auto border-b-2 border-orange-300/50 font-semibold tracking-wide text-center text-amber-600 max-w-full pt-4 px-2'>Seismic Exam FAQ</p>
              <div className='max-w-full text-left px-4 mt-4'>
                {questionData.map((category) =>
                    <section className='py-4' key={category.title}>
                      <h3 className='font-semibold pt-2 text-2xl text-slate-700'>{category.title}</h3>
                      {category.data.map((data) =>
                        <div className='py-2' key={data.question}>
                          <p className='font-semibold pt-2 text-lg text-slate-700'>{data.question}</p>
                          <p className=''> {data.answer}</p>
                        </div>
                      )}
                    </section>
                )}
              </div>
            </article>
          </section>


          <div className='sm:w-0 hidden lg:block lg:w-2/12'>
            <aside className='text-center sticky top-0'>
              <p className='text-lg text-left py-4 text-slate-500'>References</p>
                <ul className='text-left'>

                </ul>
            </aside>
          </div>
        </div>
      </main>
    )
  }


}