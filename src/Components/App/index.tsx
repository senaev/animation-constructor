import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import { BoardConnected } from '../Board/connected';

export class App extends React.Component<{}, {}> {
    public render() {
        return <MuiThemeProvider>
            <BoardConnected/>
        </MuiThemeProvider>;
    }
}
