
import React from 'react'
import styles, {layout} from '../style';
import Button from "./Button";
const Clients = () =>  (

  <section id="clients" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Ready to take our <br />Dyslexia Test?
        </h2>
        <p className={`${styles.paragraph} max-w-[470px]`}>
          Our dyslexia testing method con Vestibulum mattis commodo enim, 
         non condimentum lacus euismod sed.Vivamus lorem arcu, volutpat sed tincidunt nec, viverra ac odio. Pellentesque vehicula mauris felis, blandit malesuada tortor sagittis vel. Fusce venenatis urna nec urna ultricies porta.
        </p>
        <Button  styles={`mt-10 `}/>
      </div>
      <div className={layout.sectionImg}>
      
    </div>
  </section>
  
  )


export default Clients
