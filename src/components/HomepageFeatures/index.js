import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Common Voice at NRC feature 1',
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Write some text here
      </>
    ),
  },
  {
    title: 'Common Voice at NRC feature 2',
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Write some text here
      </>
    ),
  },
  {
    title: 'Common Voice at NRC feature 3',
    // Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Write some text here
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  let image_block = ""
  if (Svg) {
    image_block = <Svg className={styles.featureSvg} role="img" />
  }
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {image_block}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
