import React from 'react';
import { Wrapper } from '../components';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MainPage: React.FC = () => {
  return (
    <Wrapper>
      <div className="bg-black h-64">
        {/*<Bar
          className="bg-white"
          data={{
            labels: ['A', 'B', 'C'],
            datasets: [{ label: 'ola', data: [200, 300, 200] }],
          }}
        />
        */}
      </div>
    </Wrapper>
  );
};

export default MainPage;
