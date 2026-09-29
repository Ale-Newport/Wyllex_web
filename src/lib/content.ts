import type { IconName } from '../components/ui/Icon';
export const chapters = [
  {
    label: 'Meet Wyllex',
    eyebrow: 'YOUR LAW DEGREE. BROUGHT TO LIFE.',
    title: 'Law worth scrolling.',
    description:
      'Learn your degree through short, focused videos designed around what you actually need to know.',
    icon: 'play',
  },
  {
    label: 'Your subjects',
    eyebrow: '01 / MAKE IT YOURS',
    title: 'Your degree becomes your feed.',
    description:
      'Choose your university subjects. Bring your notes. Give your feed a starting point that’s yours.',
    icon: 'book',
  },
  {
    label: 'The feed',
    eyebrow: '02 / A BETTER KIND OF SCROLL',
    title: 'Scroll. But learn something.',
    description:
      'One concept at a time. Short, focused explanations that make the complicated click.',
    icon: 'play',
  },
  {
    label: 'Fresh formats',
    eyebrow: '03 / DIFFERENT WAYS TO GET IT',
    title: 'Not every concept should look the same.',
    description:
      'A case becomes a story. A rule becomes a diagram. Find the explanation that sticks.',
    icon: 'layers',
  },
  {
    label: 'Make it stick',
    eyebrow: '04 / FROM “GOT IT” TO KNOWING IT',
    title: 'Watching is only the start.',
    description:
      'Tap Study for the summary, the key takeaways, and a quick question. Give a good explanation a chance to stay.',
    icon: 'bookmark',
  },
  {
    label: 'Your material',
    eyebrow: '05 / FROM YOUR NOTES TO YOUR FEED',
    title: 'Your material. A new way in.',
    description:
      'Pick a topic, add your notes, choose a format. Create a reel around the part you want to understand.',
    icon: 'spark',
  },
  {
    label: 'Find your focus',
    eyebrow: '06 / A LITTLE SPACE TO THINK',
    title: 'Make scrolling work for you.',
    description:
      'Set aside the distractions for a while. Give your attention to something you’ll be glad you learned.',
    icon: 'focus',
  },
  {
    label: 'See your progress',
    eyebrow: '07 / SMALL SESSIONS. REAL MOMENTUM.',
    title: 'A little every day adds up.',
    description:
      'A concept on the bus. A recap between lectures. See those little moments become a learning habit.',
    icon: 'chart',
  },
  {
    label: 'All together',
    eyebrow: 'MADE FOR YOUR NEXT “I GET IT.”',
    title: 'Your Law degree. One feed.',
    description:
      'Discover it. Understand it. Remember it. A new way to get to grips with Law, wherever life takes you.',
    icon: 'grid',
  },
] satisfies {
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
}[];
export const subjects = [
  {
    name: 'Criminal Law',
    short: 'CR',
    color: '#dfb09a',
    concepts: ['Mens rea', 'Actus reus', 'Murder & manslaughter'],
    title: 'A guilty act. A guilty mind.',
    summary:
      'Break down offences, explore defences, and see how the pieces of criminal liability fit together.',
    case: 'R v Woollin',
    tag: 'INTENTION',
    detail:
      'When a result is a virtual certainty, a jury may find intention if the defendant appreciated that certainty.',
  },
  {
    name: 'Contract Law',
    short: 'CO',
    color: '#d8c5d6',
    concepts: ['Offer & acceptance', 'Consideration', 'Promissory estoppel'],
    title: 'When does a promise count?',
    summary:
      'Follow a contract from the first offer to the final remedy. Get clear on what makes an agreement binding.',
    case: 'Carlill v Carbolic Smoke Ball Co',
    tag: 'OFFER & ACCEPTANCE',
    detail:
      'An advertisement can amount to a unilateral offer where its terms show a serious intention to be bound.',
  },
  {
    name: 'Tort Law',
    short: 'TO',
    color: '#b8e3ce',
    concepts: ['Duty of care', 'Breach & causation', 'Negligence'],
    title: 'One snail. A whole new principle.',
    summary:
      'From a bottle of ginger beer to the neighbour principle. Meet the cases behind the rules you’re learning.',
    case: 'Donoghue v Stevenson',
    tag: 'DUTY OF CARE',
    detail:
      'Take reasonable care to avoid acts or omissions likely to injure people closely and directly affected by them.',
  },
  {
    name: 'Public Law',
    short: 'PU',
    color: '#b5cad7',
    concepts: ['Parliamentary sovereignty', 'Judicial review', 'Article 6 ECHR'],
    title: 'Who holds power to account?',
    summary:
      'Explore the institutions, rights, and principles that shape the relationship between the state and the individual.',
    case: 'R (Miller) v The Prime Minister',
    tag: 'CONSTITUTIONAL PRINCIPLES',
    detail:
      'Prorogation was unlawful where it frustrated Parliament’s constitutional functions without reasonable justification.',
  },
  {
    name: 'EU Law',
    short: 'EU',
    color: '#f4d78b',
    concepts: ['Direct effect', 'Primacy', 'Free movement'],
    title: 'Think beyond one legal system.',
    summary:
      'Connect the institutions and principles of EU law, with context on how they interact with domestic law.',
    case: 'Van Gend en Loos',
    tag: 'DIRECT EFFECT',
    detail:
      'Some provisions of EU law can create individual rights enforceable before national courts.',
  },
  {
    name: 'Land Law',
    short: 'LA',
    color: '#b9d3bc',
    concepts: ['Estates & interests', 'Registered land', 'Easements'],
    title: 'More than a place on a map.',
    summary: 'Unpick ownership, occupation, and the rights that travel with land.',
    case: 'Street v Mountford',
    tag: 'LEASES',
    detail:
      'Exclusive possession for a term is a key indicator of a tenancy; the label the parties use is not decisive.',
  },
  {
    name: 'Equity & Trusts',
    short: 'EQ',
    color: '#eebbb3',
    concepts: ['The three certainties', 'Fiduciary duties', 'Equitable remedies'],
    title: 'Look beneath the legal title.',
    summary:
      'Make sense of trusts, beneficial ownership, and the duties that come with looking after someone else’s interests.',
    case: 'Knight v Knight',
    tag: 'EXPRESS TRUSTS',
    detail:
      'An express private trust requires certainty of intention, subject matter, and objects.',
  },
  {
    name: 'Jurisprudence',
    short: 'JU',
    color: '#c0b6e1',
    concepts: ['Legal positivism', 'Natural law', 'The rule of law'],
    title: 'But what makes it law?',
    summary: 'Put the big questions into focus. Explore the ideas that sit underneath the rules.',
    case: 'The Hart–Fuller debate',
    tag: 'LAW & MORALITY',
    detail: 'Explore competing views on the relationship between legal validity and morality.',
  },
];
