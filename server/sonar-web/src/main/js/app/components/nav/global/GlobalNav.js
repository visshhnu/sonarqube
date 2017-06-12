/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import React from 'react';
import { connect } from 'react-redux';
import GlobalNavBranding from './GlobalNavBranding';
import GlobalNavMenu from './GlobalNavMenu';
import GlobalNavUserContainer from './GlobalNavUserContainer';
import Search from '../../search/Search';
import GlobalHelp from '../../help/GlobalHelp';
import { getCurrentUser, getAppState, getSettingValue } from '../../../../store/rootReducer';

class GlobalNav extends React.PureComponent {
  state = { helpOpen: false };

  componentDidMount() {
    window.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.onKeyPress);
  }

  onKeyPress = e => {
    const tagName = e.target.tagName;
    const code = e.keyCode || e.which;
    const isInput = tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA';
    const isTriggerKey = code === 63;
    const isModalOpen = document.querySelector('html').classList.contains('modal-open');
    if (!isInput && !isModalOpen && isTriggerKey) {
      this.openHelp();
    }
  };

  handleHelpClick = event => {
    event.preventDefault();
    this.openHelp();
  };

  openHelp = () => this.setState({ helpOpen: true });

  closeHelp = () => this.setState({ helpOpen: false });

  render() {
    /* eslint-disable max-len */
    return (
      <nav className="navbar navbar-global page-container" id="global-navigation">
        <div className="container">
          <GlobalNavBranding />

          <GlobalNavMenu {...this.props} />

          <ul className="nav navbar-nav navbar-right">
            <Search {...this.props} />
            <li>
              <a className="navbar-help" onClick={this.handleHelpClick} href="#">
                <svg width="16" height="16">
                  <g transform="matrix(0.0364583,0,0,0.0364583,1,-0.166667)">
                    <path
                      fill="#fff"
                      d="M224,344L224,296C224,293.667 223.25,291.75 221.75,290.25C220.25,288.75 218.333,288 216,288L168,288C165.667,288 163.75,288.75 162.25,290.25C160.75,291.75 160,293.667 160,296L160,344C160,346.333 160.75,348.25 162.25,349.75C163.75,351.25 165.667,352 168,352L216,352C218.333,352 220.25,351.25 221.75,349.75C223.25,348.25 224,346.333 224,344ZM288,176C288,161.333 283.375,147.75 274.125,135.25C264.875,122.75 253.333,113.083 239.5,106.25C225.667,99.417 211.5,96 197,96C156.5,96 125.583,113.75 104.25,149.25C101.75,153.25 102.417,156.75 106.25,159.75L139.25,184.75C140.417,185.75 142,186.25 144,186.25C146.667,186.25 148.75,185.25 150.25,183.25C159.083,171.917 166.25,164.25 171.75,160.25C177.417,156.25 184.583,154.25 193.25,154.25C201.25,154.25 208.375,156.417 214.625,160.75C220.875,165.083 224,170 224,175.5C224,181.833 222.333,186.917 219,190.75C215.667,194.583 210,198.333 202,202C191.5,206.667 181.875,213.875 173.125,223.625C164.375,233.375 160,243.833 160,255L160,264C160,266.333 160.75,268.25 162.25,269.75C163.75,271.25 165.667,272 168,272L216,272C218.333,272 220.25,271.25 221.75,269.75C223.25,268.25 224,266.333 224,264C224,260.833 225.792,256.708 229.375,251.625C232.958,246.542 237.5,242.417 243,239.25C248.333,236.25 252.417,233.875 255.25,232.125C258.083,230.375 261.917,227.458 266.75,223.375C271.583,219.292 275.292,215.292 277.875,211.375C280.458,207.458 282.792,202.417 284.875,196.25C286.958,190.083 288,183.333 288,176ZM384,224C384,258.833 375.417,290.958 358.25,320.375C341.083,349.792 317.792,373.083 288.375,390.25C258.958,407.417 226.833,416 192,416C157.167,416 125.042,407.417 95.625,390.25C66.208,373.083 42.917,349.792 25.75,320.375C8.583,290.958 0,258.833 0,224C0,189.167 8.583,157.042 25.75,127.625C42.917,98.208 66.208,74.917 95.625,57.75C125.042,40.583 157.167,32 192,32C226.833,32 258.958,40.583 288.375,57.75C317.792,74.917 341.083,98.208 358.25,127.625C375.417,157.042 384,189.167 384,224Z"
                    />
                  </g>
                </svg>
              </a>
            </li>
            <GlobalNavUserContainer {...this.props} />
          </ul>
        </div>

        {this.state.helpOpen &&
          <GlobalHelp onClose={this.closeHelp} sonarCloud={this.props.sonarCloud} />}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const sonarCloudSetting = getSettingValue(state, 'sonar.lf.sonarqube.com.enabled');

  return {
    currentUser: getCurrentUser(state),
    appState: getAppState(state),
    sonarCloud: sonarCloudSetting != null && sonarCloudSetting.value === 'true'
  };
};

export default connect(mapStateToProps)(GlobalNav);
