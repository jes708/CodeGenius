'use strict';


/** Repo definitions */
module.exports = function(db){
    return {
        github_id: {
            type: Sequelize.STRING
        },
        github_full_name: {
          type: Sequelize.STRING
        },
        github_url: {
          type: Sequlize.STRING
        },
        github_createdAt: {
          type: Sequelize.DATE
        },
        github_updated_at: {
          type: Sequelize.DATE
        },
        github_default_branch: {
          type: Sequelize.STRING
        }
    }
}
