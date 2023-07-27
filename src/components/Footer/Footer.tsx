'use client';
import Link from 'next/link';
import styles from './Footer.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Container from '../common/Container/Container';
import Typography from '../common/Typography/Typography';

import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContainer}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo-footer.svg"
              width={58}
              height={50}
              alt="Logo"
              className={styles.logo}
            />
            <Image
              src="/chytozavryk-footer.svg"
              width={120}
              height={16}
              alt="Logo"
              className={styles.logoText}
            />
          </div>

          <div className={styles.wrapper}>
            <div className={classNames(styles.list, styles.informationText, styles.footerList)}>
              <ul className={styles.class4}>
                <Typography className={styles.informationText} component="p" variant="footer">
                  Про проєкт
                </Typography>
                <Typography className={styles.informationText} component="p" variant="footer">
                  До вігваму
                </Typography>
              </ul>
              <ul className={styles.class1}>
                <Typography className={styles.informationText} component="p" variant="footer">
                  <Link href="#" className={styles.linkText}>
                    Політика конфіденційності
                  </Link>
                </Typography>

                <Typography className={styles.informationText} component="p" variant="footer">
                  <Link href="#" className={styles.linkText}>
                    Правила користування сайтом
                  </Link>
                </Typography>
              </ul>
            </div>

            <div className={classNames(styles.list, styles.contacts)}>
              <ul>
                <Typography className={styles.informationContact} component="p" variant="h6">
                  <Link href="tel:+380636286630" className={styles.listIcon}>
                    <Phone width={18} height={18} className={styles.image}></Phone>
                    +380 63 628 6630
                  </Link>
                </Typography>

                <Typography className={styles.informationContactSecond} component="p" variant="h6">
                  <Link href="tel:+380675681788" className={styles.listIcon}>
                    <Phone width={18} height={18} className={styles.image}></Phone>
                    +380 67 568 1788
                  </Link>
                </Typography>
                <Typography className={styles.informationMail} component="p" variant="footer-mail">
                  <Link href="mailto:1111111@gmail.com" className={styles.listIcon}>
                    <Mail width={18} height={18} className={styles.image}></Mail>
                    1111111@gmail.com
                  </Link>
                </Typography>
              </ul>

              
                <ul className={styles.social}>
                  <li>
                    <Link href="https://www.facebook.com/" target="_blank">
                      <Facebook width={32} height={32} className={styles.socialImage}></Facebook>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://www.instagram.com/" target="_blank">
                      <Instagram width={32} height={32} className={styles.socialImage}></Instagram>
                    </Link>
                  </li>
                </ul>
            
            </div>
          </div>
        </div>

        <Typography className={styles.footerText} component="p" variant="footer-end">
          Розробка Baza Trainee Ukraine 2023 Усі права захищені
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
