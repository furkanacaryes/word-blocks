import { FunctionComponent, h } from 'preact';

import { Clock } from '@Types';

import './styles.css';

type Props = Partial<Clock> & {
  withUnits?: boolean;
};

export const Time: FunctionComponent<Props> = (props) => {
  const { minutes, seconds, milliseconds, withUnits } = props;

  const units = [
    { unit: 'dk', value: minutes },
    { unit: 'sn', value: seconds },
    { unit: 'ms', value: milliseconds },
  ];

  return (
    <div className="time">
      {units.map(({ unit, value }) => (
        <div key={unit} className="time__unit">
          {value}
          <small>{withUnits ? unit : ''}</small>
        </div>
      ))}
    </div>
  );
};
