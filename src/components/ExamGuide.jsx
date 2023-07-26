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
        title: 'Day of the Exam',
        data: [
          {question:"",
           answer:"",
           image:""},
          {question:"",
           answer:"",
           image:""}
        ]
      },
      {
        title: 'After Obtaining PE License',
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
    <aside className='text-left sticky top-4 pl-2 h-4/6 rounded-lg bg-[rgb(246,209,164)] bg-[linear-gradient(196deg, rgba(246,209,164,1) 0%, rgba(246,223,155,1) 49%, rgba(182,216,248,1) 78%)]'>
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
                    <section key={category.title}>
                      <h3 className='font-semibold pt-2 text-2xl text-slate-700'>{category.title}</h3>
                      {category.data.map((data) =>
                        <div key={data.question}>
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