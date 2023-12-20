import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment'
import Chart from 'react-google-charts';


class RevenueDashboard extends React.Component {
    constructor() {
        super();
        this.state = {

        }

    };

    render() {

       
        var dataBar = [
            ['Tháng', 'Chi Nhánh 1', 'Chi Nhánh 2', 'Chi Nhánh 3',],
            ['06', 103, 540, 350],
            ['07', 660, 112, 300],
            
        ]
        const optionsBar = {
            chart: { title: 'Báo cáo bán Hàng  ', subtitle: 'Triệu đồng' },

        };
        var data = [
            [
                'Ngày',
                'Lãi Gộp',
                'Doanh Thu',
                'Giá Vốn',
            ],
            [moment("2020-06-11", 'YYYY/MM/DD').toDate(), 7.6, 12.3, 9.6],
            [moment("2020-06-12", 'YYYY/MM/DD').toDate(), 8.8, 13.6, 7.7],
            [moment("2020-06-13", 'YYYY/MM/DD').toDate(), 11.9, 17.6, 10.4],
            [moment("2020-06-14", 'YYYY/MM/DD').toDate(), 11.7, 18.8, 10.5],
            [moment("2020-06-15", 'YYYY/MM/DD').toDate(), 25.4, 57, 25.7],
            [moment("2020-06-16", 'YYYY/MM/DD').toDate(), 30.9, 69.5, 32.4],
            [moment("2020-06-17", 'YYYY/MM/DD').toDate(), 37.8, 80.8, 41.8],

        ]
        const options = {
            chart: { title: 'Báo cáo bán Hàng  ', subtitle: 'Triệu đồng' },
            hAxis: {
                format: 'd/M',
                //   gridlines: {
                //   units: {
                //     years: {format: ["YYYY"]},
                //     months: {format: ["MM"]},
                //     days: {format: ["DD"]}
                //   }
                // }
            }
        };

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href="#"><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Revenue Dashboard</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="row">

                        <div className="col-lg-6">
                            <div className="panel panel-flat">
                                <div className="tab-content">
                                    <Chart
                                        width={'100%'}
                                        height={'500px'}

                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={data}
                                        options={options}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div  className="panel panel-flat">
                                <div className="tab-content">
                                    <Chart
                                        width={'100%'}
                                        height={'500px'}

                                        chartType="Bar"
                                        loader={<div>Loading Chart</div>}
                                        data={dataBar}
                                        options={optionsBar}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default translate('translations')(RevenueDashboard);