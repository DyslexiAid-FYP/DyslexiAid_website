import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue">
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-4">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => (
  <section id="features" className={`flex flex-col md:flex-row ml-9 items-center ${layout.section}`}>
    <div className={`${layout.sectionInfo} text-center md:text-left`}>
      <h2 className={styles.heading2}>
        Use our App for Certified<br className="sm:block hidden" /> and Tailored Testing
      </h2>
      <p className={`${styles.paragraph} md:max-w-[600px] max-w-[470px] mt-5`}>
        Access certified, personalized testing through our app, designed to assess and support children with dyslexia, ensuring tailored results that fit their unique needs.
      </p>
      <Button styles="mt-10" />
    </div>

    <div className={`${layout.sectionImg} flex flex-col gap-6 w-full md:w-[50%]`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
