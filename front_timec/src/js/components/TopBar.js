import React from 'react';
import { connect } from 'react-redux';
import {LOGOUT} from '../constants/action-types';
import AgencyLogo from './AgencyLogo';
import agent from '../services/agent';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => {
        agent.asyncRequests.get("/auth/logout").then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                
            } else {
                toast.error("Có lỗi khi logout. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi logout. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
        dispatch({ type: LOGOUT });
    }
});

class TopBar  extends React.Component {
    constructor() {
        super();
    };
    render() {
        const {currentUser, onClickLogout} = this.props;
        if (!currentUser) {
            // empty topbar
            return (
                <div className="navbar navbar-default header-highlight">
                </div>);
        }
        return (
            <div className="navbar navbar-inverse">
            <div className="navbar-header"> <a className="navbar-brand" href="/">TIMEC</a>
                <ul className="nav navbar-nav visible-xs-block">
                    <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a>
                    </li>
                    <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a>
                    </li>
                </ul>
            </div>
            <div className="navbar-collapse collapse" id="navbar-mobile">
                <ul className="nav navbar-nav">
                    <li><a className="sidebar-control sidebar-main-toggle hidden-xs"><i className="icon-paragraph-justify3"></i></a>
                    </li>
                    {/* <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"> <i className="icon-bubbles4"></i> <span className="visible-xs-inline-block position-right">Messages</span> <span className="badge bg-warning-400">2</span> </a>
                    </li> */}
                </ul>
                <p className="navbar-text"><span className="label bg-teal">Đang Hoạt Động</span>
                </p>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown dropdown-user">
                        <a className="dropdown-toggle" data-toggle="dropdown"> <img src="/assets/images/anonymous-user.png" alt="" /> <span>{currentUser ? currentUser.fullName : ''}</span> <i className="caret"></i> </a>
                        <ul className="dropdown-menu dropdown-menu-right">
                            {/* <li><a href=""><i className="icon-user-plus"></i> Thông Tin Cá Nhân</a>
                            </li> */}
                            <li><a href="/UserChangePassword"><i className="icon-coins"></i> Đổi Mật Khẩu</a>
                            </li>
                            <li className="divider"></li>
                            <li><a onClick={onClickLogout}><i className="icon-switch2"></i> Đăng Xuất</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);