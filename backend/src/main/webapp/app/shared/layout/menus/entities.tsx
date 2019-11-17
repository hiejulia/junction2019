import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/hospital">
      Hospital
    </MenuItem>
    <MenuItem icon="asterisk" to="/diary">
      Diary
    </MenuItem>
    <MenuItem icon="asterisk" to="/therapist">
      Therapist
    </MenuItem>
    <MenuItem icon="asterisk" to="/face-image">
      Face Image
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
