import styles, {layout } from '../style';
import newimage from '../assets/Dyslexic1.png'
const Billing = () => (
 
    <section id="product" className={layout.sectionReverse}>
      <div className={`${layout.sectionImgReverse}`}>
        <img src={newimage} alt="billing" className="w=[100%] h-[100%] relative z-[5] mr" />
         <div className="absolute z-[3] -left-1/2 top-0 w-[50%] rounded-full white__gradient "/>
        <div className="absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient"/>
        </div>

        <div className={`${layout.sectionInfo} ml-12 pl-8`}>
        <h2 className={styles.heading2}>What is <br className="sm:block hidden" /> Dyslexia</h2>
        <p className={`${styles.paragraph} max-w-[480px] mt-5 mr-5`}> 
        Dyslexia is a learning disorder that affects reading, writing, and spelling, despite normal intelligence. It hinders the brain’s 
        ability to process language and link letters with sounds, making reading challenging. Though lifelong, with the right support, people with dyslexia can overcome these challenges and succeed.
        </p>
        </div>
    </section>
 
)

export default Billing
