import * as fs from 'fs';
import * as path from 'path';

function GitSha() : string {

    /*
    * https://stackoverflow.com/questions/34518389/get-hash-of-most-recent-git-commit-in-node
    */

    const gitPath = path.join(__dirname, '../../../.git');

    const gitHead = path.join(gitPath, 'HEAD')
    const rev = fs.readFileSync(gitHead).toString();
    if (rev.indexOf(':') === -1) {
        return rev;
    } else {
        const gitRev = path.join(gitPath, rev.substring(5).trim())
        return fs.readFileSync(gitRev).toString().trim();
    }
}

export { GitSha }

