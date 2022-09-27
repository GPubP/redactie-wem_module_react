import Core from '@redactie/redactie-core';
import { RolesRightsModuleAPI } from '@redactie/roles-rights-module';

class RolesRightsConnector {
	public apiName = 'roles-rights-module';
	public securityRights = {
		destinationRead: 'event_destination_read',
		destinationCreate: 'event_destination_create',
		destinationUpdate: 'event_destination_update',
		destinationDelete: 'event_destination_delete',
		deliveryRead: 'event_episode_read',
		deliveryCreate: 'event_episode_create',
		deliveryUpdate: 'event_episode_update',
		deliveryDelete: 'event_episode_delete',
	};
	public api: RolesRightsModuleAPI;

	constructor() {
		this.api = Core.modules.getModuleAPI<RolesRightsModuleAPI>(this.apiName);
	}
}

const rolesRightsConnector = new RolesRightsConnector();

export default rolesRightsConnector;
