import {  Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


 function Content5(){
    return(
    <>
    <div className={'container content-box p-3 '}> 
    <h5 className={' text-white p-3 '}> Category 5 </h5>
    <button className={'btn btn-dark text-white m-3  '}>New Question</button>
  
    <Collapse
      bordered={true}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      className=" m-3 site-collapse-custom-collapse"
    >
      <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
        <p className={''}></p>
      </Panel>
      <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
        <p></p>
      </Panel>
      <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
        <p></p>
      </Panel>
    </Collapse>
    </div>
    </>
    )};
    

    export default Content5;