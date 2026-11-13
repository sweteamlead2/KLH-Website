// KL University Hyderabad (KLH) — site structure and home page content, from klh.edu.in.
// Inner pages are imported from klh.edu.in into src/content/pages.json (see docs/STRUCTURE.md).
// Images are referenced by their klh.edu.in upload path and resolved in src/assets/index.js.
import IMPORTED from './content/pages.json'
import CLONED from './content/cloned.json'
// Pages cloned from other sites KLH links to (scripts/import-klh/clone.cjs); they render like the imported ones.
const PAGES = { ...CLONED, ...IMPORTED }
export { CLONED }

export const SITE = {
  name: 'KL University Hyderabad', short: 'KLH',
  foundation: 'Koneru Lakshmaiah Education Foundation',
  phone: '+91 95503 44777', // Admission Help Desk, Telangana (/admission-help-desk)
  email: 'principalofficeengg@klh.edu.in', // /contact-us
  applyUrl: 'https://www.kluniversity.in/admissions/?utm_source=Website&utm_medium=Banner&utm_campaign=2025-26AY/', // "Admissions Apply" on klh.edu.in
}
export { PAGES }

// ── Home: hero slider — the same 16 slides as the klh.edu.in home page, in the same order
export const HOME_SLIDES = [
  ['2026/04/bann1er3-1.jpg', 'Admissions Open 2026: Engineering, Management, Arts, Sciences, Law, Architecture, Pharmacy, Agriculture, Commerce. Every eligible and registered student is provided placement support. ₹75 lakh highest CTC offered by a top MNC in engineering; ₹8.1 lakh company-based median CTC in engineering; 8000+ job offers, 5000+ placements, 500+ recruiters, 12000+ internships.'],
  ['2026/04/banner1-1.jpeg', 'B.Tech, BBA & MBA, UG & PG programmes: 2026–27 admissions open.'],
  ['2026/04/N567.jpg', 'Hearty congratulations to Aziznagar campus students on their placement achievements.'],
  ['2025/10/n-scaled.jpg', 'NIRF 2025: 26th among all universities in India, 35th among engineering colleges, 46th overall, 70th among management institutes; NIRF Innovation rank band 11–50.'],
  ['2024/05/Banner-Placement-01-min-scaled.jpg', 'India’s No. 1 choice for career-oriented education: placement statistics 2023–24.'],
  ['2025/01/admission-2025-26.jpg', 'B.Tech UG & PG admissions open 2025–26.'],
  ['2024/05/Banner-Placement-02-min-scaled.jpg', 'India’s No. 1 choice for career-oriented education: placement statistics 2023–24.'],
  ['2026/04/place-1-2.jpg', 'KLH officials receive an award on stage.'],
  ['2026/04/IMG_1696-1-2-scaled.jpg', 'IEEE GRSS Summer School, 23–26 March 2026, KLH Aziznagar campus.'],
  ['2025/01/c3.jpg', 'Koneru Lakshmaiah Education Foundation convocation.'],
  ['2025/01/c1-1.jpg', 'Dignitaries in academic robes at the KLEF convocation.'],
  ['2026/04/TCS-2.jpg', 'Students placed at TCS.'],
  ['2023/04/award.jpg', 'KLH representatives receiving an award.'],
  ['2025/01/i8.jpg', 'Number of placement offers: 4728 in 2024, 4334 in 2023, 4628 in 2022, 3236 in 2021, 3001 in 2020.'],
  ['2025/01/act1.jpg', 'Hearty congratulations: AICTE–EduSkills awards.'],
  ['2025/01/i2.jpg', 'Number of research papers by calendar year.'],
]

// Home landing hero (components/Hero.jsx). Every line is KLH's own:
// title and the NAAC / UGC line appear in KLH's campus film (public/media/klh-campus.mp4); the note is HOME_SLIDES[1];
// the NIRF ranks are HOME_SLIDES[3]. `clip` is the stretch of the film that loops (its aerial campus shots), in seconds.
export const HERO = {
  clip: [2.6, 15.3],
  eyebrow: 'Koneru Lakshmaiah Education Foundation · Hyderabad',
  title: ['Shaping the', 'complete student.'],
  lead: 'A NAAC A++ grade, UGC Category 1 university. B.Tech, BCA, MCA, BBA and MBA programmes across two Hyderabad campuses, Aziznagar and Bachupally.',
  note: 'B.Tech, BBA & MBA, UG & PG: 2026–27 admissions open',
  // The strip along the bottom of the hero: NAAC / UGC (campus film), NIRF 2025 (HOME_SLIDES[3]),
  // the campuses, and the headline placement figures (HOME_SLIDES[0], the same as OUTCOME_STATS)
  tiles: [
    { k: 'Accreditation', t: 'NAAC A++', d: 'UGC Category 1 university' },
    { k: 'NIRF 2025', t: '#26 in India', d: 'Among universities · #35 in engineering' },
    { k: 'Campuses', t: 'Two in Hyderabad', d: 'Aziznagar and Bachupally' },
    { k: 'Placements', t: '₹75 L highest CTC', d: '8000+ job offers · 500+ recruiters' },
  ],
}

// Placement figures from KLH's "Admissions Open 2026" banner (HOME_SLIDES[0]): one source, so figures never contradict each other.
export const OUTCOME_STATS = [
  { v: 75, prefix: '₹', suffix: ' L', l: 'Highest CTC', d: 'Top MNC, engineering' },
  { v: 8.1, prefix: '₹', suffix: ' L', l: 'Median CTC', d: 'Company-based, engineering' },
  { v: 8000, suffix: '+', l: 'Job offers' },
  { v: 5000, suffix: '+', l: 'Placements' },
  { v: 500, suffix: '+', l: 'Recruiters' },
  { v: 12000, suffix: '+', l: 'Internships' },
]

// The two Hyderabad campuses, presented as equals everywhere (same fields, alphabetical order).
// Photos: the Aziznagar campus building (IEEE GRSS Summer School); the Bachupally campus building lobby (klh.edu.in).
export const CAMPUS_INFO = [
  { key: 'aziznagar', name: 'Aziznagar', to: '/aziznagar', img: '2026/04/IMG_1696-1-2-scaled.jpg', alt: 'Delegates in front of the KLH Aziznagar campus building' },
  { key: 'bachupally', name: 'Bachupally', to: '/bachupally', img: '2023/05/bhp-1.jpg', alt: 'Entrance lobby of the KLH Bachupally campus building' },
]

// Places on each campus (Campuses page), six each, from each campus's own klh.edu.in pages:
// Aziznagar: /facilities, /eabout (EPICS) and /campuses-locations; the captions are KLH's words, shortened.
// Bachupally: /bhp-infra-structure, /library-bowrampet, /sports-bowrampet and /bhp-contact-us; those pages are
// photographs only, so the captions just say what the photographs show.
export const CAMPUS_PLACES = {
  aziznagar: {
    where: 'Near TSPA Junction on Chilkur Road, close to Exit 18 on the ORR',
    // the map klh.edu.in embeds on /maps-directions, and the campus's admissions page (fees and programmes)
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.312115483541!2d78.3374236142407!3d17.3487080084874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb959fee4d8d47%3A0x2ff5a258ed344e3e!2sKL+UNIVERSITY+H+TEMPORARY+CAMPUS!5e0!3m2!1sen!2sin!4v1529331717144',
    at: '17.3487080084874,78.3374236142407',
    admissions: '/azadmissions', enquiry: 'Aziznagar Campus, Hyderabad',
    places: [
      { t: 'Campus', d: 'Greenery all around, with modern amenities.', photos: [['2020/09/COLL-min.jpeg', 'The Aziznagar campus buildings and lawns'], ['2020/10/libss-min.png', 'A campus building beside the lawns']] },
      { t: 'Central Library', d: 'A multi-level, air-conditioned central library.', photos: [['2020/08/LIB1.jpg', 'The library reading hall'], ['2020/08/LIB2.jpg', 'Library book stacks'], ['2020/08/LIB3-e1596342093728.jpg', 'A student reading in the library']] },
      { t: 'Labs', d: 'Classroom teaching combined with laboratory experiments.', photos: [['2020/04/labs.jpg', 'Students at a laboratory bench'], ['2020/09/CSELABS-min-1-e1599725137254.jpg', 'The corridor of the computer science labs']] },
      { t: 'Sports', d: 'Games and sports facilities for students.', photos: [['2020/04/sports.jpg', 'A cricket match on the campus ground']] },
      { t: 'EPICS', d: 'Engineering Projects in Community Service: student teams build for communities.', photos: [['2023/03/purdue66.jpg', 'Students presenting EPICS projects to visitors'], ['2023/03/purdue89.jpg', 'An EPICS team showing its project']] },
      { t: 'Transport', d: 'Buses connecting the important centres of Hyderabad.', photos: [['2021/04/des.jpg', 'A KLH college bus'], ['2021/04/sdf.jpg', 'A KLH bus parked on campus']] },
    ],
  },
  bachupally: {
    where: 'Bowrampet, Hyderabad 500043',
    // the map klh.edu.in embeds on /bhp-contact-us, and the campus's admissions page (fee structure)
    map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.1657319094716!2d78.40155347498914!3d17.547294383367383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f21c7b459b5%3A0xc307c84e835d6187!2sKLH%20Deemed%20to%20Be%20University%20Bowrampet!5e0!3m2!1sen!2sin!4v1744370438620!5m2!1sen!2sin',
    at: '17.547294383367383,78.40155347498914',
    admissions: '/bhp-fe', enquiry: 'Bachupally Campus, Hyderabad',
    places: [
      { t: 'Campus', d: 'The academic block, its entrance lobby and corridors.', photos: [['2023/04/BRR.jpg', 'The Bachupally campus academic block'], ['2023/05/bhp-1.jpg', 'The entrance lobby and reception'], ['2023/05/bhp-2.jpg', 'A corridor in the academic block']] },
      { t: 'Library', d: 'Reading tables among open book stacks.', photos: [['2026/07/BL6-scaled.jpg', 'Students studying in the library'], ['2026/07/BL1_11zon-scaled.jpg', 'Reading tables beside the book stacks'], ['2026/07/BL7-scaled.jpg', 'Students working on laptops in the library'], ['2023/05/bhp-4.jpg', 'Library book stacks']] },
      { t: 'Classrooms', d: 'Classrooms with tables and movable seating.', photos: [['2023/05/bhp-3.jpg', 'A classroom with long tables'], ['2023/05/bhp-6.jpg', 'A large classroom'], ['2023/05/bhp-7.jpg', 'A classroom with a projection screen']] },
      { t: 'Apple Innovation Center', d: 'A computer lab for hands-on sessions.', photos: [['2023/11/WhatsApp-Image-2023-11-22-at-7.31.16-AM-scaled.jpeg', 'Students at computers in the Apple Innovation Center']] },
      { t: 'Cafeteria', d: 'Tables and seating for meals between classes.', photos: [['2023/05/bhp-5.jpg', 'The cafeteria seating area']] },
      { t: 'Sports', d: 'The ground, the courts and KLH teams.', photos: [['2026/07/BS11.jpg', 'Students lined up on the campus ground'], ['2026/07/BS7.jpeg', 'A KLH team with its trophy'], ['2026/07/BS8.jpeg', 'A student playing badminton']] },
    ],
  },
}

// Header photographs for the inner pages: real KLH campus photos (never posters or banners with text, which are never cropped).
export const PAGE_PHOTO = {
  about: ['2025/01/c1-1.jpg', 'Dignitaries in academic robes at the KLEF convocation'],
  'why-klh': ['2020/08/i11-compressed-11zon.jpg', 'Students in a campus atrium'],
  learning: ['2020/08/i89-compressed-11zon.jpg', 'Students building small robots in a lab'],
  outcomes: ['2020/05/i5.jpg', 'KLH students in formal wear with faculty'],
  research: ['2020/05/i2.jpg', 'Students at electronics lab benches'],
  'campus-life': ['2020/08/i1-com.jpg', 'Student volleyball players on a campus court'],
  admissions: ['2020/08/i12-compressed-11zon.jpg', 'Students studying on the campus lawn'],
  programmes: ['2020/08/i4-compressed-11zon.jpg', 'Students in a computer lab'],
  // both campuses, side by side and equal
  campuses: [['2026/04/IMG_1696-1-2-scaled.jpg', 'The KLH Aziznagar campus building'], ['2023/11/WhatsApp-Image-2023-11-22-at-7.31.16-AM-scaled.jpeg', 'The Apple Innovation Center lab, KLH Bachupally campus']],
}
// A photograph for each school (Programmes pages)
export const SCHOOL_PHOTO = {
  'School of Engineering': ['2020/05/i2.jpg', 'Students at electronics lab benches'],
  'School of Computer Applications': ['2020/08/i4-compressed-11zon.jpg', 'Students in a computer lab'],
  'School of Management': ['2020/08/jjjj-com.jpg', 'Students in formal wear with faculty'],
}
// A photograph for each Why KLH pillar
export const PILLAR_PHOTO = {
  'ai-native': ['2022/05/D-e1653990171502.jpg', 'Students working on a laptop on campus'],
  faculty: ['2020/08/i3-co.jpg', 'Students in a lab session with faculty'],
  experiential: ['2020/08/i89-compressed-11zon.jpg', 'Students building small robots in a lab'],
  research: ['2020/08/i9-compressed-11zon-1.jpg', 'Student team testing a robot outdoors'],
  industry: ['2020/05/i6.jpg', 'Students seated in a seminar hall'],
  careers: ['2020/05/i5.jpg', 'KLH students in formal wear with faculty'],
  interdisciplinary: ['2020/08/i79-com.jpg', 'Students talking on campus'],
  leadership: ['2020/08/i14-co.jpg', 'Student sports team on the grounds'],
}

// How to apply: the steps on the Admissions page (and the home page)
export const ADMISSION_STEPS = [
  { t: 'Choose a programme', d: 'Pick a programme and the campus you want to study at.', to: '/programmes' },
  { t: 'Apply online', d: 'Fill in the application on the KL admissions portal.', to: SITE.applyUrl },
  { t: 'Entrance test', d: 'KLEEE, JEE or state entrance exams for B.Tech; KLBSAT, ICET, MAT, CAT or XAT for MBA.', to: '/admissions#eligibility' },
  { t: 'Counselling & joining', d: 'Attend counselling, confirm your seat and join your campus.', to: '/admissions#contact' },
]

// About KLH + Working Together — klh.edu.in home page
export const ABOUT_KLH = 'K L Deemed to be University, officially the Koneru Lakshmaiah Education Foundation, is a deemed university located in the Vaddeswaram Guntur district of Andhra Pradesh, offering academic programs at UG, PG, Doctoral, Post-Doctoral industry focused courses. Now K L Deemed to be University is operational in Hyderabad.'
export const WORKING_TOGETHER = { title: 'Working Together', text: 'Working together, a professor two students do worldclass research in the lab, in the field, and even over breakfast.', poster: '2016/11/poster-video.jpg' } // the film plays from src/assets CAMPUS_VIDEO

// Latest News — klh.edu.in home page (dates as published)
export const NEWS = [
  { date: '24-03-2026', img: '2026/03/SPORTS.jpg', t: 'AR Rohan Kumar (BCA 2nd Year) and K. Vaishnavi (BCA 1st Year) brought immense pride to the KLH campus by clinching bronze medals in badminton at the prestigious World University Games 2025 held in Germany', href: '/ar-rohan-kumar-bca-2nd-year-and-k-vaishnavi-bca-1st-year-brought-immense-pride-t' },
  { date: '24-03-2026', img: '2026/03/IEE-2-CON.jpg', t: 'IEEE KLH hosted International Conference – EARTH SENSE 2025 on ‘Next-Gen Technologies in Artificial Intelligence and Geoscience Remote Sensing’. Two-day international conference from September 17–18, 2025', href: '/ieee-klh-hosted-international-conference-earth-sense-2025-on-next-gen-technologi' },
  { date: '24-03-2026', img: '2026/03/asdf-e1775104253297.jpg', t: 'A 4-Day IEEE GRSS Summer School on “Harnessing SAR Technologies and Machine Learning in Indian Agriculture” held from 23–26 March 2026', href: '/ieee-12' },
  { date: '24-03-2026', img: '2026/03/PRI99-1.jpg', t: 'Department of CSE, KLH Aziznagar Campus has successfully organized “Love for AI 2026”, a grand AI Techno-Cultural Event, on 13–14 February 2026', href: '/happy-to-share-that-the-department-of-cse-klh-aziznagar-campus-has-successfully' },
]

// Gallery slider ("NSS Blood Donation Camp-2026") — same images, same order as klh.edu.in
export const GALLERY = ['2023/10/photo_6138874942213700227_y-1.jpg', '2023/03/saikamal.jpg', '2022/06/q7.jpg', '2022/06/q6.jpg', '2022/06/q4.jpg', '2022/04/S1.jpg', '2022/04/S2.jpg', '2022/04/S3.jpg', '2022/04/S4.jpg', '2022/04/S5.jpg', '2022/06/q3.jpg', '2022/06/q5.jpg', '2022/08/Updated.jpg', '2022/08/photo_2022-08-31_17-38-29.jpg', '2022/08/photo_2022-08-31_17-37-49.jpg', '2022/09/photo_2022-09-15_17-17-01.jpg', '2023/10/Amazon-02.jpg', '2023/10/Amazon-01-1.jpg', '2026/04/counselling-1.jpg', '2025/11/photo_2025-11-15_10-25-06.jpg', '2026/03/simons.jpg', '2026/02/student.jpg', '2026/03/cumins.jpg', '2026/02/infosys.jpg', '2026/02/donationcamp.jpg', '2025/11/photo_2025-11-15_10-24-59.jpg', '2025/11/photo_2025-11-15_10-24-45.jpg', '2025/11/photo_2025-11-15_10-24-53.jpg', '2025/11/photo_2025-11-01_14-27-12.jpg', '2025/11/photo_2025-11-01_14-27-00.jpg', '2025/11/photo_2025-11-01_14-26-49.jpg', '2025/11/photo_2025-11-01_14-25-30.jpg', '2025/11/photo_2025-11-01_14-25-22.jpg', '2025/11/photo_2025-11-01_14-25-12.jpg', '2025/11/photo_2025-11-01_14-25-01.jpg', '2025/11/photo_2025-11-15_10-24-38.jpg']

// "Why study at KL University" graphic and its text (klh.edu.in home page)
export const WHY_STUDY = { img: '2026/04/DESF-1.png', items: ['Lush Green Campus', 'Flexible Academic System', 'Professor Centric Labs', 'Global Certifications', 'Smart Village Revolution', 'Interdisciplinary Departments', 'Semester Readiness Program', 'Eminent Faculty', 'Student Activity Centre', '100% Placements for All Eligible Students', 'Strong Research & Innovation', 'Comprehensive Student Support', 'Ragging-Free Campus', 'Practice School', 'Project-Based Labs', 'Design Thinking & Innovation', 'Student Research (Undergraduate)', 'Social Immersive Learning', 'State-of-the-Art Infrastructure', 'Skill Development', 'Lab Taken to Class (LTC)'] }

// Centre of Excellence photo gallery — klh.edu.in home page
export const COE = [
  ['2020/05/i5.jpg', 'KLH students in formal wear with faculty'], ['2020/08/i1-com.jpg', 'Student volleyball players on a campus court'], ['2020/08/i888-co.jpg', 'Lamp lighting at a campus ceremony'],
  ['2020/08/i79-com.jpg', 'Students talking on campus'], ['2020/08/i9-compressed-11zon-1.jpg', 'Student team testing a robot outdoors'], ['2020/08/i12-compressed-11zon.jpg', 'Students studying on the campus lawn'],
  ['2020/08/i14-co.jpg', 'Student sports team on the grounds'], ['2020/08/jjjj-com.jpg', 'Students in formal wear with faculty'], ['2020/08/i89-compressed-11zon.jpg', 'Students building small robots in a lab'],
  ['2020/08/i11-compressed-11zon.jpg', 'Students in a campus atrium'], ['2022/05/D-e1653990171502.jpg', 'Students working on a laptop on campus'], ['2020/08/i4-compressed-11zon.jpg', 'Students in a computer lab'],
  ['2020/05/i6.jpg', 'Students seated in a seminar hall'], ['2020/05/i2.jpg', 'Students at electronics lab benches'], ['2020/08/i3-co.jpg', 'Students in a lab session with faculty'],
]

// Testimonials — klh.edu.in (quotes verbatim)
export const TESTIMONIALS = [
  ['2022/04/ak1.jpg', 'T Akhilesh', 'I have always wanted to work as a Software Developer for a super dream company. With the hands-on experience and faculty support provided at KLH, my dream came true. I am thankful for providing a platform to enhance my technical skills.'],
  ['2022/04/stu.jpg', 'Vongur Manasvi', 'The Career Guidance Centre Placements was an excellent gate pass into the challenging corporate world. Thanks for the support and wishing the KLH Team to reach greater heights in the coming years for the upcoming batches.'],
  ['2022/04/ARP.jpg', 'Arpita Pandey', 'I am delighted to receive multiple offers from KLH with enchanting packages. Thanks to KL University Hyderabad.'],
  ['2022/04/ASD.jpg', 'K Sri Aashritha', 'Feels amazing to have years of support and encouragement from my KLH. Helped me deal with life and transformed me to what I am today.'],
  ['2022/04/S1-1.jpg', 'Pavan Kumar', 'KLH provided me the perfect platform for my future. I could not have expected more in terms of placements and academia.'],
  ['2022/04/S6.jpg', 'Deepak Reddy', 'The faculty were extremely supportive. The course curriculum helped me acquire the necessary expertise.'],
  ['2022/04/S7.jpg', 'C Vittal', 'IDEATE | INNOVATE | INSPIRE. Department of Electronics believes in the above three words and this culture helped me get my dream job.'],
  ['2022/04/S5-1.jpg', 'Madhurya', 'The culture of flexibility and liberty in my KLH allowed me to explore and pursue my dream of working in a deep tech network.'],
  ['2022/04/S8.jpg', 'Yashaswini Chowdary', 'The environment and culture at my KLH helped me build leadership skills, teamwork, and made me ready for the corporate world.'],
]

// Recent Awards & Rankings — klh.edu.in home page
export const AWARDS = [
  'KLEF is the winner of international award by Greentech international for OUTSTANDING ACHIEVEMENT IN EHS (Environment, Health and Safety) BEST PRACTICES, January-2023',
  'KL Deemed to be University got Andhra Pradesh State Energy Conservation Award – 2022, announced by APSECM in December 2022.',
  'Koneru Lakshmaiah Education Foundation (Deemed to be University) was awarded second prize for application of “Excellence in Water Management” by CII South Region in 2022.',
  'Koneru Lakshmaiah Education Foundation (Deemed to be University) was awarded third prize for application of “Excellence in Waste Management” by CII South Region in 2022.',
  'Koneru Lakshmaiah Education Foundation (Deemed to be University) was awarded “Excellence in Energy Management” by CII South Region in 2022.',
]

// Our Partners — klh.edu.in home page
export const PARTNERS = [['2022/05/amazon-web-services-academy-e1652949088488.jpg', 'AWS Academy'], ['2022/05/bp.png', 'Blue Prism University'], ['2022/05/cisco.jpg', 'Cisco Networking Academy'], ['2022/05/redhat-e1652949139131.png', 'Red Hat Academy']]
export const RECRUITERS = [['2020/04/csc-1.png', 'CSC'], ['2020/04/hp-1.png', 'HP'], ['2020/04/ibm-2.png', 'IBM'], ['2020/04/info.png', 'Infosys'], ['2020/04/valuelabs.png', 'ValueLabs'], ['2020/04/intel.png', 'Intel'], ['2020/04/cts.png', 'Cognizant'], ['2020/04/cisco-1.png', 'Cisco'], ['2020/04/TA.png', 'Tata Consultancy Services'], ['2020/04/amazon-2.png', 'Amazon'], ['2020/04/wipro-1.png', 'Wipro']]

// ── Campuses: only the two Hyderabad campuses, as on klh.edu.in
export const CAMPUS_SLIDES = {
  aziznagar: ['2026/04/bann1er3-1.jpg', '2025/01/admission-2025-26.jpg', '2026/04/N567.jpg', '2025/10/n-scaled.jpg'],
  bachupally: ['2026/10/theme-banner-huhh1_compressed.jpg'],
}
export const CAMPUS_MENUS = {
  aziznagar: [
    ['Academics', [['Faculties', '/faculties'], ['Computer Science & Engineering', '/cse'], ['Artificial Intelligence & Data Science', '/ai-home'], ['Electronics & Communication Engineering', '/ece-home'], ['Master of Business Administration (MBA)', '/mba-home'], ['Department of H&S', '/hs-home'], ['Rules & Regulations', '/rules'], ['Academic Calendars', '/academic-calendars'], ['BOS Meeting Minutes', '/bos-metting-minutes'], ['EC Meeting Minutes', '/ec-meeting-minutes']]],
    ['AICTE', [['AICTE Letters', '/aicte-letters'], ['Mandatory Disclosures', '/aziznagar-aicte']]],
    ['Admissions', [['Admissions', '/azadmissions']]],
    ['Campus Life', [['Campus Life', '/aziznagar'], ['Facilities', '/facilities'], ['Sports', '/faculty'], ['EPICS', '/eabout'], ['Student Activity Centre', '/campus-life#clubs']]],
  ],
  bachupally: [
    ['Academics', [['Faculty', '/bhp-faculty'], ['Computer Science & Engineering', '/bhp-cse'], ['Computer Science & Information Technology', '/bhp-csit'], ['Electronics & Communication Engineering', '/bhp-ece'], ['Master of Business Administration', '/bhp-mba'], ['Academic Regulations & Curriculum', '/files/klh.edu.in/wp-content/uploads/2023/05/Academic-Year-2022-23.pdf'], ['Academic Calendar', '/files/klh.edu.in/wp-content/uploads/2025/11/Y25-B.Tech-PBL-Academic-Calendar-2025-26.pdf']]],
    ['Admissions', [['Fee Structure', '/bhp-fe'], ['Scholarships', '/scholarships-2025-26'], ['Tuition Fee', '/hyderabad-campus-bowrampet'], ['Transport Fee', '/bhp-bus-fee-bowrampet']]],
    ['AICTE & cells', [['Campus Video', '/campus-video'], ['AICTE – Mandatory Disclosures', '/aicte'], ['UGC Mandatory Disclosure', '/ugc-mandatory-disclosure'], ['IQAC', '/all-cells'], ['NAD & ABC', '/nad-abc'], ['IPR Cell', '/ipr-cell'], ['Institute Innovation Council (IIC)', '/institute-innovation-council'], ['Entrepreneurship Development Cell (EDC)', '/edc'], ['Skill Development Cell (SDC)', '/skill-development-cellsdc'], ['Women Empowerment Cell', '/women-safety'], ['Equal Opportunity Cell', '/equal-opportunity-cell'], ['Intake Approved', '/intake-approved']]],
    ['Campus Life', [['Infrastructure', '/bhp-infra-structure'], ['Events', '/events-bhp'], ['Library', '/library-bowrampet'], ['Sports', '/sports-bowrampet'], ['TEDx 2026', '/tedxbachupally'], ['Contact Us', '/bhp-contact-us']]],
  ],
}

export { SCHOOLS, COURSES, CAMPUS_OPTIONS, SLOT_OPTIONS } from './formOptions'

// ── Footer — the same four columns as klh.edu.in
export const FOOTER = {
  about: [['About Us', '/inception-brief-history'], ['Collaborations', '/collaborations'], ['LMS', 'https://lms.klh.edu.in/'], ['ERP', 'https://herp.klh.edu.in/login'], ['AICTE Mandatory Disclosure', '/about#quality'], ['Feedback', '/feedsys']],
  important: [['ExamSection', '/exam-home'], ['Alumni', '/alumni'], ['NSS', '/campus-life#communities'], ['Hobby Clubs', '/campus-life#clubs'], ['Ivarna', '/campus-life#clubs'], ['KLH mail', 'https://mail.google.com/a/klh.edu.in'], ['Staff Grievances', '/staff-grievances'], ['Newsletter', '/newsletters'], ['Contact Us', '/contact-us']],
  social: [['Facebook', 'https://www.facebook.com/KLUniversityH/'], ['Twitter', 'https://twitter.com/KLUniversity_H'], ['LinkedIn', 'https://www.linkedin.com/company/kluniversityh'], ['Instagram', 'https://www.instagram.com/kluniversityh/'], ['Youtube', 'https://www.youtube.com/channel/UCE55ePd6uS-lSGDaKitf4Ig']],
}
