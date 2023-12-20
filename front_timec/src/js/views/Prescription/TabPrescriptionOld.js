import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment';
import PrescriptionOld from './PrescriptionOld';


class TabPrescriptionOld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPrescriptions: null,
        }
    }

    componentWillMount() {
        this.getListPrescriptionByPatientId();
    }

    getListPrescriptionByPatientId(){
        var patientId = this.props.patientId;
        let setStateInRequest = (list) => { this.setState({ listPrescriptions: list }) }
        return (agent.asyncRequests.get("/prescription/listFindByPatientId?patientId="+patientId).then(function(res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    render() {

        const { prescriptionId } = this.props;
        const listPrescriptions = this.state.listPrescriptions;

        if (listPrescriptions) {
            var rowOld = listPrescriptions.map(item => {
                return <PrescriptionOld prescriptionObject={item} key={"prescription123_" + item.id}
                    prescriptionId={prescriptionId}
                ></PrescriptionOld>
            })
        }
        return (
            <table className="table table-xxs table-bordered" >
                <thead >
                    <tr className="bg-teal" >
                        <th width="5%"><i className="icon-menu-open2"></i></th>
                        {/* <th>Mã Toa</th> */}
                        <th colSpan='5'>Bệnh Sử - Đơn thuốc cũ</th>
                        {/* <th>Bác Sĩ </th>
                        <th>ICD </th> */}
                        {/* <th width="10%" className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th> */}
                    </tr>
                </thead>
                <tbody >
                    {rowOld}
                </tbody>
            </table>
        )
    }
}


export default translate('translations')(TabPrescriptionOld);