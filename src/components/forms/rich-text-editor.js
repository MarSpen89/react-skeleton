import React, { Component } from 'react';
import { EditorState, conertToRaw, convertToRaw, contentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-draftjs";
import htmlToDraft from "html-to draftjs";

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.uploadFile = this.uploadFile.bind(this);

    }

    componentWillMount() {
        if (this.props.editMode && this.props.contentToEdit) {
            const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState=createFromBlockArray(contentBlocks, entityMap);
            const editorSTate = EditorState.createWithContent(contentState);
            this.setState({ editorState });
        }
    }

    onEditorStateChage(editorState) {
        this.setState(
            { editorState },
            this.props.handleRichTextEditorChange(
                draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            )
        );
    }
    
    getBase6(File, callBack) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader,onload = () => callBack(reader.result);
        reader.onerror = error => {};
    }

    uploadFile(file) {
        return new Promise((ressolve, reject) => {
            this.getBase64(file, data => ressolve({ data: { link: data } }));
        })
    }        

    render() {
        return (
            <div>
            <Editor
            editorState={this.state.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChage}
            toolBar={{
                inline: { inDropDown: true },
                list: { inDropDown: true },
                textAlign: { inDropDown: true },
                link: { inDropDown: true },
                history: { inDropDown:true },
                Image: {
                    uploadCallBack: this.uploadFile,
                    alt: { present: true, mandatory: false },
                    previewImage: true,
                    inputAccept: " image/gif,image/jpeg,image/jpeg,image/jpg,image/png,image/svg"
                }
            }}
            />
            </div>
        );
    }
}